const { Web3 } = require('web3');
const axios = require('axios');
const logger = require('../utils/logger');

// Initialize Web3 for Ethereum
const web3 = new Web3(process.env.ETH_RPC_URL || 'https://eth.llamarpc.com');

/**
 * Blockchain Service for verifying cryptocurrency transactions
 * This service provides methods to verify transactions on different blockchains
 */

/**
 * Verify Bitcoin transaction
 * Uses blockchain.info API or Bitcoin RPC if configured
 * @param {string} txHash - Transaction hash
 * @param {string} expectedAddress - Expected recipient address
 * @param {number} expectedAmount - Expected amount in BTC
 * @returns {Promise<Object>} - Transaction verification result
 */
async function verifyBitcoinTransaction(txHash, expectedAddress, expectedAmount) {
  try {
    logger.info(`Verifying Bitcoin transaction: ${txHash}`);

    // Use blockchain.info API for verification
    const apiUrl = `https://blockchain.info/rawtx/${txHash}`;
    const response = await axios.get(apiUrl);
    const tx = response.data;

    // Check if transaction exists
    if (!tx) {
      return {
        verified: false,
        error: 'Transaction not found'
      };
    }

    // Find output matching our address
    const output = tx.out.find(out => 
      out.addr === expectedAddress
    );

    if (!output) {
      return {
        verified: false,
        error: 'Address not found in transaction outputs'
      };
    }

    // Convert satoshi to BTC
    const receivedAmount = output.value / 100000000;

    // Verify amount (allow small tolerance for fees)
    const tolerance = 0.0001; // 0.01% tolerance
    const amountVerified = Math.abs(receivedAmount - expectedAmount) < tolerance;

    return {
      verified: amountVerified,
      transactionHash: txHash,
      fromAddress: tx.inputs[0]?.prev_out?.addr || 'Unknown',
      toAddress: expectedAddress,
      amount: receivedAmount,
      expectedAmount: expectedAmount,
      confirmations: tx.block_height ? await getBitcoinConfirmations(tx.block_height) : 0,
      timestamp: tx.time,
      blockHash: tx.block_hash || null,
      error: amountVerified ? null : 'Amount mismatch'
    };

  } catch (error) {
    logger.error('Bitcoin transaction verification error:', error);
    return {
      verified: false,
      error: error.message || 'Failed to verify Bitcoin transaction'
    };
  }
}

/**
 * Get Bitcoin confirmations
 * @param {number} blockHeight - Block height of transaction
 * @returns {Promise<number>} - Number of confirmations
 */
async function getBitcoinConfirmations(blockHeight) {
  try {
    const response = await axios.get('https://blockchain.info/latestblock');
    const latestBlock = response.data.height;
    return latestBlock - blockHeight + 1;
  } catch (error) {
    logger.error('Error getting Bitcoin confirmations:', error);
    return 0;
  }
}

/**
 * Verify Ethereum transaction
 * @param {string} txHash - Transaction hash
 * @param {string} expectedAddress - Expected recipient address
 * @param {number} expectedAmount - Expected amount in ETH
 * @returns {Promise<Object>} - Transaction verification result
 */
async function verifyEthereumTransaction(txHash, expectedAddress, expectedAmount) {
  try {
    logger.info(`Verifying Ethereum transaction: ${txHash}`);

    // Get transaction receipt
    const tx = await web3.eth.getTransaction(txHash);
    const receipt = await web3.eth.getTransactionReceipt(txHash);

    if (!tx || !receipt) {
      return {
        verified: false,
        error: 'Transaction not found or not confirmed'
      };
    }

    // Check if transaction was successful
    if (!receipt.status) {
      return {
        verified: false,
        error: 'Transaction failed on blockchain'
      };
    }

    // Normalize addresses for comparison
    const normalizedExpected = expectedAddress.toLowerCase();
    const normalizedTo = tx.to.toLowerCase();

    // Verify recipient address
    if (normalizedTo !== normalizedExpected) {
      return {
        verified: false,
        error: 'Address mismatch'
      };
    }

    // Convert Wei to ETH
    const receivedAmount = parseFloat(web3.utils.fromWei(tx.value, 'ether'));

    // Verify amount
    const tolerance = 0.0001; // Small tolerance
    const amountVerified = Math.abs(receivedAmount - expectedAmount) < tolerance;

    // Get current block number for confirmations
    const currentBlock = await web3.eth.getBlockNumber();
    const confirmations = currentBlock - receipt.blockNumber;

    return {
      verified: amountVerified && receipt.status,
      transactionHash: txHash,
      fromAddress: tx.from,
      toAddress: tx.to,
      amount: receivedAmount,
      expectedAmount: expectedAmount,
      confirmations: confirmations,
      blockNumber: receipt.blockNumber,
      blockHash: receipt.blockHash,
      gasUsed: receipt.gasUsed.toString(),
      timestamp: tx.blockNumber ? (await web3.eth.getBlock(tx.blockNumber)).timestamp : null,
      error: amountVerified ? null : 'Amount mismatch'
    };

  } catch (error) {
    logger.error('Ethereum transaction verification error:', error);
    return {
      verified: false,
      error: error.message || 'Failed to verify Ethereum transaction'
    };
  }
}

/**
 * Verify USDT (ERC-20) transaction on Ethereum
 * @param {string} txHash - Transaction hash
 * @param {string} expectedAddress - Expected recipient address
 * @param {number} expectedAmount - Expected amount in USDT
 * @returns {Promise<Object>} - Transaction verification result
 */
async function verifyUSDTTransaction(txHash, expectedAddress, expectedAmount) {
  try {
    logger.info(`Verifying USDT transaction: ${txHash}`);

    // USDT contract address on Ethereum mainnet
    const USDT_CONTRACT = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

    // Get transaction receipt
    const tx = await web3.eth.getTransaction(txHash);
    const receipt = await web3.eth.getTransactionReceipt(txHash);

    if (!tx || !receipt) {
      return {
        verified: false,
        error: 'Transaction not found or not confirmed'
      };
    }

    // Check if transaction was successful
    if (!receipt.status) {
      return {
        verified: false,
        error: 'Transaction failed on blockchain'
      };
    }

    // Verify it's a USDT transaction
    if (tx.to.toLowerCase() !== USDT_CONTRACT.toLowerCase()) {
      return {
        verified: false,
        error: 'Not a USDT transaction'
      };
    }

    // Parse transfer event from logs
    const transferEvent = receipt.logs.find(log => 
      log.topics[0] === web3.utils.sha3('Transfer(address,address,uint256)')
    );

    if (!transferEvent) {
      return {
        verified: false,
        error: 'Transfer event not found'
      };
    }

    // Decode transfer event
    const toAddress = '0x' + transferEvent.topics[2].slice(26);
    const amount = web3.utils.hexToNumber(transferEvent.data);
    const receivedAmount = amount / 1000000; // USDT has 6 decimals

    // Verify recipient address
    if (toAddress.toLowerCase() !== expectedAddress.toLowerCase()) {
      return {
        verified: false,
        error: 'Address mismatch'
      };
    }

    // Verify amount
    const tolerance = 0.01; // Small tolerance for USDT
    const amountVerified = Math.abs(receivedAmount - expectedAmount) < tolerance;

    // Get confirmations
    const currentBlock = await web3.eth.getBlockNumber();
    const confirmations = currentBlock - receipt.blockNumber;

    return {
      verified: amountVerified && receipt.status,
      transactionHash: txHash,
      fromAddress: tx.from,
      toAddress: toAddress,
      amount: receivedAmount,
      expectedAmount: expectedAmount,
      confirmations: confirmations,
      blockNumber: receipt.blockNumber,
      blockHash: receipt.blockHash,
      timestamp: tx.blockNumber ? (await web3.eth.getBlock(tx.blockNumber)).timestamp : null,
      error: amountVerified ? null : 'Amount mismatch'
    };

  } catch (error) {
    logger.error('USDT transaction verification error:', error);
    return {
      verified: false,
      error: error.message || 'Failed to verify USDT transaction'
    };
  }
}

/**
 * Verify cryptocurrency transaction based on currency type
 * @param {string} cryptocurrency - Currency type (BTC, ETH, USDT)
 * @param {string} txHash - Transaction hash
 * @param {string} address - Expected recipient address
 * @param {number} amount - Expected amount
 * @returns {Promise<Object>} - Transaction verification result
 */
async function verifyTransaction(cryptocurrency, txHash, address, amount) {
  try {
    let result;

    switch (cryptocurrency.toUpperCase()) {
      case 'BTC':
        result = await verifyBitcoinTransaction(txHash, address, amount);
        break;
      case 'ETH':
        result = await verifyEthereumTransaction(txHash, address, amount);
        break;
      case 'USDT':
        result = await verifyUSDTTransaction(txHash, address, amount);
        break;
      default:
        result = {
          verified: false,
          error: `Unsupported cryptocurrency: ${cryptocurrency}`
        };
    }

    return result;
  } catch (error) {
    logger.error('Transaction verification error:', error);
    return {
      verified: false,
      error: error.message || 'Transaction verification failed'
    };
  }
}

/**
 * Get current cryptocurrency price in USD
 * @param {string} symbol - Cryptocurrency symbol (BTC, ETH, USDT)
 * @returns {Promise<number>} - Price in USD
 */
async function getCryptoPrice(symbol) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=usd`
    );
    
    const coinId = symbol === 'BTC' ? 'bitcoin' : symbol === 'ETH' ? 'ethereum' : 'tether';
    return response.data[coinId]?.usd || 0;
  } catch (error) {
    logger.error('Error fetching crypto price:', error);
    return 0;
  }
}

/**
 * Monitor pending payment for confirmation
 * This would typically be called by a background job
 * @param {string} paymentId - Payment document ID
 * @param {number} maxAttempts - Maximum verification attempts
 * @returns {Promise<Object>} - Monitoring result
 */
async function monitorPayment(paymentId, maxAttempts = 10) {
  // This is a placeholder for a background job that would:
  // 1. Fetch the payment from database
  // 2. Verify the transaction
  // 3. Update payment status
  // 4. Send notifications
  // Implementation would use a job queue like Bull or Agenda
  logger.info(`Payment monitoring started for ${paymentId}`);
  return {
    status: 'monitoring',
    paymentId
  };
}

module.exports = {
  verifyTransaction,
  verifyBitcoinTransaction,
  verifyEthereumTransaction,
  verifyUSDTTransaction,
  getCryptoPrice,
  monitorPayment
};
