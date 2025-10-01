const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  validateCreateMultiSigWallet,
  validateUpdateMultiSigWallet,
  validateAddSigner,
  validateCreateTransactionApproval,
  validateApproveTransaction,
  validateExecuteTransaction
} = require('../middleware/validation');
const { 
  createWallet,
  getWallets,
  getWallet,
  updateWallet,
  addSigner,
  removeSigner,
  deleteWallet
} = require('../controllers/multiSigWalletController');
const {
  createTransactionApproval,
  getTransactionApprovals,
  getTransactionApproval,
  approveTransaction,
  executeTransaction,
  cancelTransaction
} = require('../controllers/transactionApprovalController');

// All routes require authentication
router.use(protect);

// Transaction approval routes (must come before /:id to avoid conflicts)
router.route('/transactions')
  .post(validateCreateTransactionApproval, createTransactionApproval)
  .get(getTransactionApprovals);

router.route('/transactions/:id')
  .get(getTransactionApproval)
  .delete(cancelTransaction);

router.route('/transactions/:id/approve')
  .post(validateApproveTransaction, approveTransaction);

router.route('/transactions/:id/execute')
  .post(validateExecuteTransaction, executeTransaction);

// Wallet management routes
router.route('/')
  .post(validateCreateMultiSigWallet, createWallet)
  .get(getWallets);

router.route('/:id')
  .get(getWallet)
  .put(validateUpdateMultiSigWallet, updateWallet)
  .delete(deleteWallet);

router.route('/:id/signers')
  .post(validateAddSigner, addSigner);

router.route('/:id/signers/:signerId')
  .delete(removeSigner);

module.exports = router;
