const Payment = require('../models/Payment');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { asyncHandler } = require('../middleware/errorHandler');
const { AppError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');

// @desc    Confirm payment
// @route   POST /api/payments/confirm
// @access  Public
const confirmPayment = asyncHandler(async (req, res, next) => {
  const { orderId, transactionHash } = req.body;

  // Find order
  const order = await Order.findById(orderId).populate('items.product');
  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  // Check if order is already paid
  if (order.status === 'paid' || order.status === 'processing') {
    return next(new AppError('Order already paid', 400));
  }

  // Check if transaction hash already exists
  const existingPayment = await Payment.findOne({ transactionHash });
  if (existingPayment) {
    return next(new AppError('Transaction hash already used', 400));
  }

  // Create payment record
  const payment = await Payment.create({
    order: order._id,
    transactionHash,
    cryptocurrency: order.cryptocurrency,
    amount: order.totalPrice,
    amountUSD: order.totalPriceUSD,
    toAddress: order.paymentAddress,
    status: 'confirmed' // In production, this would be 'pending' until verified
  });

  // Update order
  order.status = 'paid';
  order.transactionHash = transactionHash;
  await order.save();

  // Update product stock
  for (const item of order.items) {
    if (item.product) {
      item.product.stock -= item.quantity;
      await item.product.save();
    }
  }

  logger.info(`Payment confirmed for order ${order._id}: ${transactionHash}`);

  res.json({
    success: true,
    data: {
      payment,
      order
    }
  });
});

// @desc    Get payment by order ID
// @route   GET /api/payments/order/:orderId
// @access  Public (with order ID)
const getPaymentByOrder = asyncHandler(async (req, res, next) => {
  const payment = await Payment.findOne({ order: req.params.orderId });

  if (!payment) {
    return next(new AppError('Payment not found', 404));
  }

  res.json({
    success: true,
    data: { payment }
  });
});

// @desc    Get all payments (admin)
// @route   GET /api/payments
// @access  Private/Admin
const getAllPayments = asyncHandler(async (req, res, next) => {
  const { status, page = 1, limit = 20 } = req.query;

  const query = {};
  if (status) query.status = status;

  const skip = (page - 1) * limit;
  const payments = await Payment.find(query)
    .populate({
      path: 'order',
      populate: { path: 'user', select: 'name email' }
    })
    .sort('-createdAt')
    .skip(skip)
    .limit(Number(limit));

  const total = await Payment.countDocuments(query);

  res.json({
    success: true,
    data: {
      payments,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

module.exports = {
  confirmPayment,
  getPaymentByOrder,
  getAllPayments
};
