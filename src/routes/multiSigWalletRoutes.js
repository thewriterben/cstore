const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
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

// Wallet management routes
router.route('/wallets')
  .post(validateCreateMultiSigWallet, createWallet)
  .get(getWallets);

router.route('/wallets/:id')
  .get(getWallet)
  .put(validateUpdateMultiSigWallet, updateWallet)
  .delete(deleteWallet);

router.route('/wallets/:id/signers')
  .post(validateAddSigner, addSigner);

router.route('/wallets/:id/signers/:signerId')
  .delete(removeSigner);

// Transaction approval routes
router.route('/transactions')
  .post(createTransactionApproval)
  .get(getTransactionApprovals);

router.route('/transactions/:id')
  .get(getTransactionApproval)
  .delete(cancelTransaction);

router.route('/transactions/:id/approve')

router.route('/transactions/:id/execute')
  .post(executeTransaction);

module.exports = router;
