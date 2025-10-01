const app = require('./src/app');
const logger = require('./src/utils/logger');
const seedData = require('./src/utils/seedData');

const PORT = process.env.PORT || 3000;

// Start server
const server = app.listen(PORT, async () => {
  logger.info(`Cryptocurrency Marketplace running on http://localhost:${PORT}`);
  logger.info(`API available at http://localhost:${PORT}/api`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Seed initial data if needed
  if (process.env.SEED_DATA === 'true') {
    await seedData();
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
  });
});

module.exports = server;
