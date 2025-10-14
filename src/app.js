const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const middleware = require('i18next-http-middleware');
require('dotenv').config();

const connectDB = require('./config/database');
const i18next = require('./config/i18n');
const { initializeApp } = require('./config/startup');
const { initRedisClient } = require('./config/redis');
const { getCorsOptions } = require('./config/cors');
const { initializeSecurityConfig } = require('../config/security');
const { initializeEncryptionConfig } = require('../config/database-encryption');
const logger = require('./utils/logger');
const { errorHandler } = require('./middleware/errorHandler');
const {
  securityHeaders,
  limiter,
  authLimiter,
  sanitizeData,
  xssClean,
  preventParamPollution
} = require('./middleware/security');
const { enforceHttps, secureSessionCookies } = require('./middleware/httpsEnforcement');
const elasticsearchService = require('./services/elasticsearchService');

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const adminRoutes = require('./routes/adminRoutes');
const multiSigWalletRoutes = require('./routes/multiSigWalletRoutes');
const lightningRoutes = require('./routes/lightningRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const printifyRoutes = require('./routes/printifyRoutes');
const { getCryptocurrencies } = require('./controllers/orderController');

const app = express();

// Initialize security configuration
initializeSecurityConfig();

// Initialize encryption configuration
initializeEncryptionConfig();

// Connect to database
connectDB();

// Initialize Redis (for token blacklist)
initRedisClient().catch(err => {
  logger.error('Redis initialization failed:', err);
});

// Initialize application (currency rates, regional payments)
initializeApp().catch(err => {
  logger.error('Application initialization failed:', err);
});

// Initialize Elasticsearch if enabled
if (process.env.ELASTICSEARCH_ENABLED === 'true') {
  elasticsearchService.initializeClient();
  // Create index and check availability
  elasticsearchService.isAvailable().then(available => {
    if (available) {
      elasticsearchService.createProductsIndex();
      logger.info('Elasticsearch initialized and ready for advanced search');
    } else {
      logger.warn('Elasticsearch is enabled but not available. Falling back to MongoDB search.');
    }
  });
}

// HTTPS enforcement (must be first)
app.use(enforceHttps);
app.use(secureSessionCookies);

// Security middleware
app.use(securityHeaders);
app.use(limiter);
app.use(sanitizeData);
app.use(xssClean);
app.use(preventParamPollution);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// i18n middleware
app.use(middleware.handle(i18next));

// CORS - Environment-specific configuration
const corsOptions = getCorsOptions();
app.use(cors(corsOptions));
logger.info(`CORS configured for environment: ${process.env.NODE_ENV || 'development'}`);

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  }));
}

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Serve admin dashboard (React app)
app.use('/admin', express.static(path.join(__dirname, '../admin-dashboard/dist')));

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/multisig', multiSigWalletRoutes);
app.use('/api/lightning', lightningRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/printify', printifyRoutes);
app.get('/api/cryptocurrencies', getCryptocurrencies);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: req.t('message.serverRunning'),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    language: req.language
  });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Admin dashboard SPA routing - must come before 404 handler
app.get(/^\/admin(?:\/.*)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../admin-dashboard/dist', 'index.html'));
});

// Handle 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
