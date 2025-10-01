// API Base URL
const API_URL = window.location.origin + '/api';

// State
let products = [];
let selectedProduct = null;
let currentOrder = null;
let currentLanguage = localStorage.getItem('language') || 'en';

// Product icons mapping
const productIcons = {
    '1': '💻',
    '2': '🎧',
    '3': '⌚',
    '4': '⌨️',
    '5': '🖥️'
};

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    initializeLanguage();
    await loadProducts();
    setupEventListeners();
});

// Initialize language
function initializeLanguage() {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
        languageSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            localStorage.setItem('language', currentLanguage);
            // Set cookie for server-side language detection
            document.cookie = `i18next=${currentLanguage}; path=/; max-age=31536000`;
            // Reload to apply language changes
            window.location.reload();
        });
    }
}

// Get API headers with language
function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Accept-Language': currentLanguage
    };
}

// Load products from API
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products?lng=${currentLanguage}`, {
            headers: getHeaders()
        });
        const data = await response.json();
        
        if (data.success) {
            products = data.products;
            displayProducts(products);
        }
    } catch (error) {
        console.error('Error loading products:', error);
        showError('Failed to load products. Please refresh the page.');
    }
}

// Display products in grid
function displayProducts(products) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => showProductModal(product);
    
    const stockStatus = product.stock === 0 ? 'out-of-stock' : 
                       product.stock <= 5 ? 'low-stock' : '';
    
    card.innerHTML = `
        <div class="product-image">
            ${productIcons[product.id] || '📦'}
        </div>
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">
                <span class="crypto-price">${product.price} ${product.currency}</span>
                <span class="usd-price">~$${product.priceUSD}</span>
            </div>
            <div class="product-stock ${stockStatus}">
                ${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </div>
            <button class="btn" ${product.stock === 0 ? 'disabled' : ''}>
                ${product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
            </button>
        </div>
    `;
    
    return card;
}

// Show product modal
function showProductModal(product) {
    if (product.stock === 0) return;
    
    selectedProduct = product;
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h2>${product.name}</h2>
        <div class="product-image" style="margin-bottom: 1rem;">
            ${productIcons[product.id] || '📦'}
        </div>
        <p style="margin-bottom: 1rem;">${product.description}</p>
        <div class="product-price" style="margin-bottom: 1.5rem;">
            <span class="crypto-price">${product.price} ${product.currency}</span>
            <span class="usd-price">~$${product.priceUSD}</span>
        </div>
        <div class="product-stock" style="margin-bottom: 1.5rem;">
            ${product.stock} available
        </div>
        
        <form id="order-form">
            <div class="form-group">
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" min="1" max="${product.stock}" value="1" required>
            </div>
            
            <div class="form-group">
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" required>
            </div>
            
            <div class="form-group">
                <label for="cryptocurrency">Payment Method:</label>
                <select id="cryptocurrency" name="cryptocurrency" required>
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="USDT">Tether (USDT)</option>
                </select>
            </div>
            
            <button type="submit" class="btn">Proceed to Payment</button>
        </form>
    `;
    
    modal.classList.remove('hidden');
    
    // Setup form submission
    document.getElementById('order-form').onsubmit = async (e) => {
        e.preventDefault();
        await createOrder();
    };
}

// Create order
async function createOrder() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const email = document.getElementById('email').value;
    const cryptocurrency = document.getElementById('cryptocurrency').value;
    
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: selectedProduct.id,
                quantity: quantity,
                customerEmail: email,
                cryptocurrency: cryptocurrency
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentOrder = data.order;
            closeModal();
            showPaymentSection();
        } else {
            showError(data.message || 'Failed to create order');
        }
    } catch (error) {
        console.error('Error creating order:', error);
        showError('Failed to create order. Please try again.');
    }
}

// Show payment section
function showPaymentSection() {
    // Hide products section
    document.getElementById('products-section').classList.add('hidden');
    
    // Show payment section
    const paymentSection = document.getElementById('payment-section');
    paymentSection.classList.remove('hidden');
    
    const paymentDetails = document.getElementById('payment-details');
    paymentDetails.innerHTML = `
        <div class="order-summary">
            <h3>Order Summary</h3>
            <div class="order-item">
                <span>Product:</span>
                <strong>${currentOrder.productName}</strong>
            </div>
            <div class="order-item">
                <span>Quantity:</span>
                <strong>${currentOrder.quantity}</strong>
            </div>
            <div class="order-item">
                <span>Payment Method:</span>
                <strong>${currentOrder.cryptocurrency}</strong>
            </div>
            <div class="order-item">
                <span>Total:</span>
                <strong>${currentOrder.totalPrice} ${currentOrder.cryptocurrency} (~$${currentOrder.totalPriceUSD})</strong>
            </div>
        </div>
        
        <div class="payment-instructions">
            <h3>Payment Instructions</h3>
            <ol>
                <li>Send exactly <strong>${currentOrder.totalPrice} ${currentOrder.cryptocurrency}</strong> to the address below</li>
                <li>After sending, enter your transaction hash</li>
                <li>Your order will be confirmed once payment is verified</li>
            </ol>
        </div>
        
        <div class="form-group">
            <label>Payment Address:</label>
            <div class="payment-address">${currentOrder.paymentAddress}</div>
        </div>
        
        <form id="payment-form">
            <div class="form-group">
                <label for="transaction-hash">Transaction Hash:</label>
                <input type="text" id="transaction-hash" name="transactionHash" 
                       placeholder="Enter your transaction hash" required>
            </div>
            
            <button type="submit" class="btn">Confirm Payment</button>
            <button type="button" class="btn back-button" onclick="goBackToProducts()">
                Cancel Order
            </button>
        </form>
    `;
    
    // Setup payment form submission
    document.getElementById('payment-form').onsubmit = async (e) => {
        e.preventDefault();
        await confirmPayment();
    };
}

// Confirm payment
async function confirmPayment() {
    const transactionHash = document.getElementById('transaction-hash').value;
    
    try {
        const response = await fetch(`${API_URL}/payments/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderId: currentOrder.id,
                transactionHash: transactionHash
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccessMessage();
        } else {
            showError(data.message || 'Failed to confirm payment');
        }
    } catch (error) {
        console.error('Error confirming payment:', error);
        showError('Failed to confirm payment. Please try again.');
    }
}

// Show success message
function showSuccessMessage() {
    const paymentDetails = document.getElementById('payment-details');
    paymentDetails.innerHTML = `
        <div class="success-message">
            <h3>✅ Payment Confirmed!</h3>
            <p>Your order has been successfully placed and payment confirmed.</p>
            <p>Order ID: <strong>${currentOrder.id}</strong></p>
            <p>A confirmation email has been sent to <strong>${currentOrder.customerEmail}</strong></p>
        </div>
        
        <button class="btn" onclick="goBackToProducts()">Continue Shopping</button>
    `;
}

// Go back to products
function goBackToProducts() {
    // Hide payment section
    document.getElementById('payment-section').classList.add('hidden');
    
    // Show products section
    document.getElementById('products-section').classList.remove('hidden');
    
    // Reset state
    currentOrder = null;
    selectedProduct = null;
    
    // Reload products to update stock
    loadProducts();
}

// Close modal
function closeModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

// Show error message
function showError(message) {
    alert(message);
}

// Setup event listeners
function setupEventListeners() {
    // Close modal when clicking X
    document.querySelector('.close').onclick = closeModal;
    
    // Close modal when clicking outside
    window.onclick = (event) => {
        const modal = document.getElementById('product-modal');
        if (event.target === modal) {
            closeModal();
        }
    };
}
