const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    // Skip connection if explicitly requested
    if (process.env.SKIP_DB_CONNECTION === 'true') {
      logger.info('Skipping database connection (SKIP_DB_CONNECTION=true)');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cryptons', {
      // Mongoose 6+ doesn't need these options
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

  } catch (error) {
    logger.error('MongoDB connection failed:', error);
    
    // Don't exit in test environment
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
