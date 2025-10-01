const express = require('express');
const router = express.Router();
const {
  getSupportedCurrencies,
  getExchangeRates,
  convertCurrency,
  updateExchangeRates,
  getExchangeRateHistory,
  setManualRate
} = require('../controllers/currencyController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getSupportedCurrencies);
router.get('/rates', getExchangeRates);
router.post('/convert', convertCurrency);

// Admin routes
router.post('/rates/update', protect, authorize('admin'), updateExchangeRates);
router.get('/rates/history', protect, authorize('admin'), getExchangeRateHistory);
router.post('/rates/manual', protect, authorize('admin'), setManualRate);

module.exports = router;
