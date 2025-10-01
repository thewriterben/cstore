const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validateWishlistItem } = require('../middleware/validation');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist
} = require('../controllers/wishlistController');

// All wishlist routes require authentication
router.use(protect);

router.get('/', getWishlist);
router.post('/items', validateWishlistItem, addToWishlist);
router.delete('/items/:productId', removeFromWishlist);
router.delete('/', clearWishlist);

module.exports = router;
