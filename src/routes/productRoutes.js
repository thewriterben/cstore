const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSuggestions,
  syncElasticsearch
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

const router = express.Router();

router.get('/', getProducts);
router.get('/suggestions', getSuggestions);
router.post('/sync-elasticsearch', protect, authorize('admin'), syncElasticsearch);
router.get('/:id', getProduct);
router.post('/', protect, authorize('admin'), validate(schemas.createProduct), createProduct);
router.put('/:id', protect, authorize('admin'), validate(schemas.updateProduct), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;
