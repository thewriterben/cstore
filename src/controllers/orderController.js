const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');
const { AppError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const currencyService = require('../services/currencyService');

// Supported cryptocurrencies with addresses
const supportedCryptos = [
  { symbol: 'BTC', name: 'Bitcoin', address: process.env.BTC_ADDRESS || 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
  { symbol: 'ETH', name: 'Ethereum', address: process.env.ETH_ADDRESS || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
  { symbol: 'USDT', name: 'Tether', address: process.env.USDT_ADDRESS || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
  { symbol: 'BTC-LN', name: 'Bitcoin Lightning Network', address: 'Lightning Network' }
];

// @desc    Create order
// @route   POST /api/orders
// @access  Public
const createOrder = asyncHandler(async (req, res, next) => {
  const { productId, quantity, customerEmail, cryptocurrency, shippingAddress, displayCurrency } = req.body;

  // Get product
  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    return next(new AppError('Product not found', 404));
  }

  // Check stock
  if (product.stock < quantity) {
    return next(new AppError('Insufficient stock', 400));
  }

  // Get crypto address
  const crypto = supportedCryptos.find(c => c.symbol === cryptocurrency);
  if (!crypto) {
    return next(new AppError('Unsupported cryptocurrency', 400));
  }

  // Calculate prices
  const totalPriceUSD = product.priceUSD * quantity;
  let displayPrice = totalPriceUSD;
  let exchangeRate = 1;
  let orderCurrency = displayCurrency || 'USD';

  // Convert to user's preferred currency if specified
  if (displayCurrency && displayCurrency.toUpperCase() !== 'USD') {
    try {
      const conversion = await currencyService.convertCurrency(
        totalPriceUSD,
        'USD',
        displayCurrency.toUpperCase()
      );
      displayPrice = conversion.convertedAmount;
      exchangeRate = conversion.exchangeRate;
      orderCurrency = displayCurrency.toUpperCase();
    } catch (error) {
      logger.warn(`Currency conversion failed during order creation: ${error.message}`);
      // Continue with USD if conversion fails
      orderCurrency = 'USD';
    }
  }

  // Create order
  const order = await Order.create({
    user: req.user ? req.user.id : null,
    customerEmail,
    items: [{
      product: product._id,
      productName: product.name,
      quantity,
      price: product.price,
      priceUSD: product.priceUSD
    }],
    totalPrice: product.price * quantity,
    totalPriceUSD,
    displayCurrency: orderCurrency,
    displayPrice,
    exchangeRate,
    cryptocurrency,
    paymentAddress: crypto.address,
    shippingAddress,
    status: 'pending'
  });

  logger.info(`Order created: ${order._id} for ${customerEmail}`);

  res.status(201).json({
    success: true,
    data: { order }
  });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public (with order ID)
const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('items.product', 'name image');

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  // Check if user is authorized to view this order
  if (req.user) {
    if (req.user.role !== 'admin' && order.user && order.user.toString() !== req.user.id) {
      return next(new AppError('Not authorized to view this order', 403));
    }
  }

  res.json({
    success: true,
    data: { order }
  });
});

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id })
    .populate('items.product', 'name image')
    .sort('-createdAt');

  res.json({
    success: true,
    data: { orders }
  });
});

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res, next) => {
  const { status, page = 1, limit = 20 } = req.query;

  const query = {};
  if (status) query.status = status;

  const skip = (page - 1) * limit;
  const orders = await Order.find(query)
    .populate('user', 'name email')
    .populate('items.product', 'name image')
    .sort('-createdAt')
    .skip(skip)
    .limit(Number(limit));

  const total = await Order.countDocuments(query);

  res.json({
    success: true,
    data: {
      orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  order.status = status;
  await order.save();

  logger.info(`Order ${order._id} status updated to ${status} by admin ${req.user.email}`);

  res.json({
    success: true,
    data: { order }
  });
});

// @desc    Get supported cryptocurrencies
// @route   GET /api/cryptocurrencies
// @access  Public
const getCryptocurrencies = asyncHandler(async (req, res, next) => {
  res.json({
    success: true,
    data: { cryptocurrencies: supportedCryptos }
  });
});

module.exports = {
  createOrder,
  getOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getCryptocurrencies
};
