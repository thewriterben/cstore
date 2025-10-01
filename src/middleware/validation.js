const Joi = require('joi');
const { AppError } = require('./errorHandler');

// Validate request body
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const message = error.details.map(detail => detail.message).join(', ');
      return next(new AppError(message, 400));
    }

    next();
  };
};

// Common validation schemas
const schemas = {
  // User registration
  register: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required()
  }),

  // User login
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  // Create order
  createOrder: Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
    customerEmail: Joi.string().email().required(),
    cryptocurrency: Joi.string().valid('BTC', 'ETH', 'USDT').required(),
    shippingAddress: Joi.object({
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      postalCode: Joi.string(),
      country: Joi.string()
    }).optional()
  }),

  // Confirm payment
  confirmPayment: Joi.object({
    orderId: Joi.string().required(),
    transactionHash: Joi.string().min(10).required()
  }),

  // Create product (admin)
  createProduct: Joi.object({
    name: Joi.string().min(3).max(200).required(),
    description: Joi.string().min(10).max(2000).required(),
    price: Joi.number().min(0).required(),
    priceUSD: Joi.number().min(0).required(),
    currency: Joi.string().valid('BTC', 'ETH', 'USDT').default('BTC'),
    category: Joi.string().optional(),
    stock: Joi.number().integer().min(0).default(0),
    image: Joi.string().optional()
  }),

  // Update product (admin)
  updateProduct: Joi.object({
    name: Joi.string().min(3).max(200).optional(),
    description: Joi.string().min(10).max(2000).optional(),
    price: Joi.number().min(0).optional(),
    priceUSD: Joi.number().min(0).optional(),
    currency: Joi.string().valid('BTC', 'ETH', 'USDT').optional(),
    category: Joi.string().optional(),
    stock: Joi.number().integer().min(0).optional(),
    image: Joi.string().optional(),
    isActive: Joi.boolean().optional()
  }),

  // Create review
  createReview: Joi.object({
    productId: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    title: Joi.string().max(100).optional(),
    comment: Joi.string().min(10).max(1000).required()
  })
};

module.exports = { validate, schemas };
