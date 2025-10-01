const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// Security headers
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    }
  }
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
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
  sanitizeData,
  xssClean,
  preventParamPollution
};
