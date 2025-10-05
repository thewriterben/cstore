const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const { logRateLimitExceeded } = require('../utils/auditLogger');

// Security headers with enhanced configuration
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  // Strict Transport Security (HSTS)
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  // Prevent MIME type sniffing
  noSniff: true,
  // Disable X-Powered-By header
  hidePoweredBy: true,
  // XSS Protection
  xssFilter: true,
  // Prevent clickjacking
  frameguard: {
    action: 'deny'
  },
  // Referrer Policy
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  }
});

// Rate limiting with audit logging
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || 100),
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logRateLimitExceeded(req);
    res.status(429).json({
      success: false,
      error: 'Too many requests',
      message: 'You have exceeded the rate limit. Please try again later.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX || 5), // Default: 5 attempts
  message: 'Too many authentication attempts, please try again later.',
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logRateLimitExceeded(req);
    res.status(429).json({
      success: false,
      error: 'Too many authentication attempts',
      message: 'You have made too many login attempts. Please try again later.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Rate limiting for multi-sig approval operations
const multiSigApprovalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Limit each IP to 50 approval requests per hour
  message: 'Too many approval requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  // Use standard IP-based rate limiting
  skip: (req) => !req.user // Skip rate limiting if not authenticated
});

// MongoDB sanitization - prevent NoSQL injection (Express 5 compatible)
// Note: express-mongo-sanitize has compatibility issues with Express 5
// This custom middleware removes MongoDB operators from request data
const sanitizeData = (req, res, next) => {
  const removeMongoOperators = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    
    Object.keys(obj).forEach(key => {
      // Remove keys that start with $ (MongoDB operators)
      if (key.startsWith('$')) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        removeMongoOperators(obj[key]);
      }
    });
    return obj;
  };

  // Sanitize body (mutable in Express 5)
  if (req.body) removeMongoOperators(req.body);
  
  // Note: req.query and req.params are immutable in Express 5
  // Query string sanitization is handled by validation layer
  
  next();
};

// XSS protection - custom middleware (Express 5 compatible)
// Note: xss-clean package is deprecated and not compatible with Express 5
// This custom middleware sanitizes HTML/JavaScript in request body only
// Query and params are immutable in Express 5, so we sanitize at validation layer
const xssClean = (req, res, next) => {
  const sanitizeValue = (value) => {
    if (typeof value === 'string') {
      // Remove basic XSS patterns
      return value
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/on\w+\s*=\s*[^\s>]*/gi, '');
    }
    return value;
  };

  const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'string') {
        obj[key] = sanitizeValue(obj[key]);
      } else if (typeof obj[key] === 'object') {
        sanitizeObject(obj[key]);
      }
    });
    return obj;
  };

  // Only sanitize body in Express 5 (query and params are immutable)
  if (req.body) sanitizeObject(req.body);
  
  next();
};

// Prevent HTTP parameter pollution
const preventParamPollution = hpp({
  whitelist: ['price', 'rating', 'stock'] // Allow duplicates for these params
});

module.exports = {
  securityHeaders,
  limiter,
  authLimiter,
  multiSigApprovalLimiter,
  sanitizeData,
  xssClean,
  preventParamPollution
};
