const express = require('express');
const router = express.Router();
const lightningController = require('../controllers/lightningController');
const { protect, authorize } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

/**
 * Public routes - Lightning payment operations
 */

// Get Lightning Network info and status
router.get('/info', lightningController.getLightningInfo);

// Create Lightning invoice for order
router.post(
  '/invoices',
  validate(schemas.createLightningInvoice),
  lightningController.createInvoice
);

// Get invoice status by payment hash
router.get('/invoices/:paymentHash', lightningController.getInvoiceStatus);

// Confirm Lightning payment
router.post(
  '/payments/confirm',
  validate(schemas.confirmLightningPayment),
  lightningController.confirmPayment
);

// Decode Lightning payment request
router.post(
  '/decode',
  validate(schemas.decodeLightningPayment),
  lightningController.decodePaymentRequest
);

/**
 * Protected routes - Admin only
 */

// Get wallet balance
router.get('/balance', protect, authorize('admin'), lightningController.getBalance);

// List all channels
router.get('/channels', protect, authorize('admin'), lightningController.listChannels);

// Open new channel
router.post(
  '/channels',
  protect,
  authorize('admin'),
  validate(schemas.openLightningChannel),
  lightningController.openChannel
);

// Close channel
router.delete('/channels/:channelId', protect, authorize('admin'), lightningController.closeChannel);

// Pay invoice (admin operation)
router.post(
  '/pay',
  protect,
  authorize('admin'),
  validate(schemas.payLightningInvoice),
  lightningController.payInvoice
);

module.exports = router;
