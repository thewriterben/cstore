# CStore - Cryptocurrency Marketplace

A modern, lightweight marketplace that accepts cryptocurrency payments for products. Built with Node.js and Express.

## Features

- 🪙 **Cryptocurrency Payments**: Accept Bitcoin (BTC), Ethereum (ETH), and Tether (USDT)
- 🛍️ **Product Catalog**: Browse and purchase products with crypto
- 📦 **Order Management**: Track orders and payment status
- 💳 **Multiple Cryptocurrencies**: Support for major cryptocurrencies
- 🎨 **Modern UI**: Clean, responsive interface
- 🔒 **Secure**: Payment verification system

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Payment**: Cryptocurrency (simulated for demo)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/thewriterben/cstore.git
cd cstore
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your cryptocurrency wallet addresses (optional for demo)

### Running the Application

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/cryptocurrencies` - Get supported cryptocurrencies

### Orders

- `POST /api/orders` - Create new order
  ```json
  {
    "productId": "1",
    "quantity": 1,
    "customerEmail": "customer@example.com",
    "cryptocurrency": "BTC"
  }
  ```
- `GET /api/orders/:id` - Get order details

### Payments

- `POST /api/payments/confirm` - Confirm payment
  ```json
  {
    "orderId": "order-id",
    "transactionHash": "transaction-hash"
  }
  ```

### Health

- `GET /api/health` - Health check endpoint

## Usage

1. **Browse Products**: View available products on the homepage
2. **Select Product**: Click on a product to view details
3. **Place Order**: Enter quantity, email, and select cryptocurrency
4. **Make Payment**: Send crypto to the provided address
5. **Confirm Payment**: Enter transaction hash to confirm payment
6. **Order Complete**: Receive confirmation of successful order

## Project Structure

```
cstore/
├── server.js           # Main server file
├── package.json        # Node.js dependencies
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
├── README.md          # This file
└── public/            # Frontend files
    ├── index.html     # Main HTML file
    ├── css/
    │   └── style.css  # Styling
    └── js/
        └── app.js     # Frontend JavaScript
```

## Demo Note

This is a demonstration project. In a production environment, you would need to:

- Implement real blockchain verification
- Add database for persistent storage
- Implement user authentication
- Add proper security measures
- Integrate with real payment gateways
- Add email notifications
- Implement proper error handling and logging

## Security Considerations

- Never commit `.env` file with real wallet addresses
- Use HTTPS in production
- Implement rate limiting
- Add input validation and sanitization
- Use proper authentication and authorization
- Monitor transactions on blockchain

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Disclaimer

This is a demonstration project for educational purposes. Do not use in production without proper security audits and real blockchain integration.