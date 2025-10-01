const Product = require('../models/Product');
const { asyncHandler } = require('../middleware/errorHandler');
const { AppError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res, next) => {
  const { 
    category, 
    search, 
    minPrice, 
    maxPrice, 
    sort = '-createdAt',
    page = 1,
    limit = 10 
  } = req.query;

  // Build query
  const query = { isActive: true };

  if (category) {
    query.category = category;
  }

  if (search) {
    query.$text = { $search: search };
  }

  if (minPrice || maxPrice) {
    query.priceUSD = {};
    if (minPrice) query.priceUSD.$gte = Number(minPrice);
    if (maxPrice) query.priceUSD.$lte = Number(maxPrice);
  }

  // Execute query with pagination
  const skip = (page - 1) * limit;
  const products = await Product.find(query)
    .populate('category', 'name slug')
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(query);

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('category', 'name slug');

  if (!product || !product.isActive) {
    return next(new AppError('Product not found', 404));
  }

  res.json({
    success: true,
    data: { product }
  });
});

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  logger.info(`Product created: ${product.name} by admin ${req.user.email}`);

  res.status(201).json({
    success: true,
    data: { product }
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  logger.info(`Product updated: ${product.name} by admin ${req.user.email}`);

  res.json({
    success: true,
    data: { product }
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  // Soft delete - just mark as inactive
  product.isActive = false;
  await product.save();

  logger.info(`Product deleted: ${product.name} by admin ${req.user.email}`);

  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
