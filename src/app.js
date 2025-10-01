const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/database');
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
const { getCryptocurrencies } = require('./controllers/orderController');

const app = express();

// Connect to database
connectDB();

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

// Security middleware
app.use(securityHeaders);
app.use(limiter);
app.use(sanitizeData);
app.use(xssClean);
app.use(preventParamPollution);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors());

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
app.get('/api/cryptocurrencies', getCryptocurrencies);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
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
