const logger = require('../utils/logger');

/**
 * Get allowed origins based on environment
 * @returns {Array|string|function} - Allowed origins configuration
 */
const getAllowedOrigins = () => {
  const env = process.env.NODE_ENV || 'development';
  
  // Get origins from environment variable
  const envOrigins = process.env.ALLOWED_ORIGINS;
  
  if (envOrigins) {
    // Split comma-separated origins and trim whitespace
    const origins = envOrigins.split(',').map(origin => origin.trim()).filter(origin => origin);
    if (origins.length > 0) {
      logger.info(`CORS allowed origins from env: ${origins.join(', ')}`);
      return origins;
    }
  }
  
  // Default origins by environment
  switch (env) {
    case 'production':
      // PRODUCTION: Strict whitelist - NO wildcards
      return [
        'https://cryptons.com',
        'https://www.cryptons.com',
        'https://app.cryptons.com'
      ];
    
    case 'staging':
      return [
        'https://staging.cryptons.com',
        'https://staging-app.cryptons.com'
      ];
    
    case 'development':
    case 'test':
      // Development: Allow localhost with common ports
      return [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:8080',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
        'http://127.0.0.1:8080'
      ];
    
    default:
      logger.warn(`Unknown environment: ${env}, using development CORS settings`);
      return [
        'http://localhost:3000',
        'http://localhost:3001'
      ];
  }
};

/**
 * CORS origin validator function
 * @param {string} origin - Request origin
 * @param {function} callback - CORS callback
 */
const corsOriginValidator = (origin, callback) => {
  const allowedOrigins = getAllowedOrigins();
  
  // Allow requests with no origin (mobile apps, curl, postman, etc.)
  if (!origin) {
    // In production, you might want to block requests without origin
    if (process.env.NODE_ENV === 'production' && process.env.CORS_BLOCK_NO_ORIGIN === 'true') {
      logger.warn('Blocked request without origin in production');
      return callback(new Error('Origin header required'), false);
    }
    return callback(null, true);
  }
  
  // Check if origin is allowed
  if (allowedOrigins.includes(origin)) {
    callback(null, true);
  } else {
    logger.warn(`CORS blocked origin: ${origin}`);
    callback(new Error(`Origin ${origin} not allowed by CORS policy`), false);
  }
};

/**
 * Get CORS options for the application
 * @returns {Object} - CORS options
 */
const getCorsOptions = () => {
  const env = process.env.NODE_ENV || 'development';
  
  return {
    origin: corsOriginValidator,
    credentials: process.env.CORS_CREDENTIALS === 'true' || true, // Default to true for cookie/auth support
    optionsSuccessStatus: 200, // Some legacy browsers (IE11) choke on 204
    maxAge: parseInt(process.env.CORS_MAX_AGE) || 86400, // 24 hours
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'X-HTTP-Method-Override',
      'Accept',
      'Accept-Language',
      'X-CSRF-Token'
    ],
    exposedHeaders: [
      'Content-Range',
      'X-Content-Range',
      'X-Total-Count'
    ],
    preflightContinue: false
  };
};

/**
 * Get simple CORS options for specific routes (e.g., webhooks)
 * @returns {Object} - Simple CORS options
 */
const getWebhookCorsOptions = () => {
  return {
    origin: false, // Webhooks don't need CORS
    credentials: false
  };
};

module.exports = {
  getAllowedOrigins,
  getCorsOptions,
  getWebhookCorsOptions,
  corsOriginValidator
};
