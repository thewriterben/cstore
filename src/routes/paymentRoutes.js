const express = require('express');
const {
  confirmPayment,
  getPaymentByOrder,
  getAllPayments
} = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

const router = express.Router();

router.post('/confirm', validate(schemas.confirmPayment), confirmPayment);
router.get('/order/:orderId', getPaymentByOrder);
router.get('/', protect, authorize('admin'), getAllPayments);

module.exports = router;
