# CStore - Cryptocurrency Marketplace (In Development)

A cryptocurrency marketplace built with Node.js, Express, and MongoDB. This application is currently in active development and includes JWT authentication, basic blockchain integration, security measures, and core e-commerce backend features.

## ⚠️ Project Status

**This project is in active development and NOT production-ready.** Many features are planned but not yet implemented. Please see the sections below for details on what is currently available versus what is planned for future releases.

## 🚀 Version 2.0 - Current Release

This version includes enhancements over the basic demo:

### ✅ Implemented Features

- 🔐 **JWT Authentication**: Secure user registration and login with bcrypt password hashing
- 💾 **MongoDB Integration**: Persistent data storage with Mongoose ODM
- 🛡️ **Security**: Helmet, rate limiting, input validation, and sanitization
- 📊 **Database Models**: Users, Products, Orders, Payments, Categories, Reviews (models only - Review has no API endpoints)
- 🔍 **Product Filtering**: Basic product search, filtering by price/category, sorting, and pagination
- 👤 **User Management**: User profiles and role-based access control (admin/user)
- 📦 **Order Management**: Basic order creation and status tracking
- 💳 **Payment Processing**: Basic payment confirmation with transaction hash
- 🧪 **Testing Suite**: Basic Jest tests with Supertest for authentication and products
- 🐳 **Docker Support**: Dockerfile and Docker Compose configuration
- 📝 **Logging**: Winston logger with file and console transports
- 🚦 **Error Handling**: Centralized error handling middleware
- 📈 **Admin Features**: Admin-only endpoints for product and order management

### 🔧 Partially Implemented Features

- **Blockchain Integration**: Basic blockchain service exists with verification functions for BTC, ETH, and USDT, but uses public APIs. No real-time monitoring or webhook support.
- **Category System**: Category model exists and products can be filtered by category, but no dedicated category management API endpoints.
- **Reviews**: Review model exists in database, but no API endpoints to create, read, update, or delete reviews.

### ❌ Not Yet Implemented (Planned)

- Product reviews and ratings API endpoints
- Shopping cart functionality
- Wishlist feature
- Advanced search with Elasticsearch
- Product recommendations
- Real-time payment confirmation monitoring
- Email notifications (order confirmations, payment receipts, shipping notifications)
- Admin dashboard UI (React-based panel)
- Sales analytics and reporting
- Multi-signature wallet support

## Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database and ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Winston** - Logging
- **Morgan** - HTTP request logging
- **Joi** - Request validation

### Security
- **Helmet** - Security headers
- **Express Rate Limit** - Rate limiting
- **Custom Sanitization** - NoSQL injection prevention (Express 5 compatible)
- **HPP** - HTTP parameter pollution prevention

### Frontend
- **HTML5**, **CSS3**, **Vanilla JavaScript**
- Responsive design
- Clean, modern UI

### DevOps
- **Docker** & **Docker Compose**
- **Jest** & **Supertest** - Testing
- **GitHub Actions** - Basic CI/CD workflow files included (may need configuration)

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (v7.0 or higher) or Docker
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/thewriterben/cstore.git
cd cstore
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
```bash
cp .env.example .env
```

Edit `.env` and update the following variables:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/cstore

# JWT Secrets (Generate strong secrets for production!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-change-in-production

# Cryptocurrency Wallet Addresses (Replace with your own)
BTC_ADDRESS=your-btc-address
ETH_ADDRESS=your-eth-address
USDT_ADDRESS=your-usdt-address

# Initial data seeding
SEED_DATA=true
```

4. **Start MongoDB** (if not using Docker):
```bash
# Using Homebrew (macOS)
brew services start mongodb-community

# Using systemd (Linux)
sudo systemctl start mongod
```

### Running the Application

#### Development Mode:
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

#### Legacy Mode (v1.0 with in-memory storage):
```bash
npm run start:legacy
```

The application will be available at `http://localhost:3000`

### Using Docker

#### Run with Docker Compose (Recommended):
```bash
# Start all services (MongoDB + Application)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Development with Docker:
```bash
# Start in development mode with hot-reload
docker-compose --profile dev up -d app-dev
```

### Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated"
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?page=1&limit=10&search=laptop&minPrice=100&maxPrice=1000
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Create Product (Admin Only)
```http
POST /api/products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 0.005,
  "priceUSD": 250,
  "stock": 20,
  "category": "category-id"
}
```

#### Update Product (Admin Only)
```http
PUT /api/products/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "stock": 25,
  "price": 0.006
}
```

#### Delete Product (Admin Only)
```http
DELETE /api/products/:id
Authorization: Bearer <admin-token>
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token> (optional)
Content-Type: application/json

{
  "productId": "product-id",
  "quantity": 2,
  "customerEmail": "customer@example.com",
  "cryptocurrency": "BTC",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  }
}
```

#### Get Order
```http
GET /api/orders/:id
Authorization: Bearer <token> (optional)
```

#### Get My Orders
```http
GET /api/orders/my-orders
Authorization: Bearer <token>
```

#### Get All Orders (Admin Only)
```http
GET /api/orders?status=pending&page=1&limit=20
Authorization: Bearer <admin-token>
```

#### Update Order Status (Admin Only)
```http
PUT /api/orders/:id/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "shipped"
}
```

### Payment Endpoints

#### Confirm Payment
```http
POST /api/payments/confirm
Content-Type: application/json

{
  "orderId": "order-id",
  "transactionHash": "0x1234567890abcdef..."
}
```

#### Get Payment by Order
```http
GET /api/payments/order/:orderId
```

#### Get All Payments (Admin Only)
```http
GET /api/payments?status=confirmed&page=1&limit=20
Authorization: Bearer <admin-token>
```

### Cryptocurrency Endpoints

#### Get Supported Cryptocurrencies
```http
GET /api/cryptocurrencies
```

### Health Check

```http
GET /api/health
```

## 🏗️ Project Structure

```
cstore/
├── src/                        # Source code
│   ├── config/                 # Configuration files
│   │   └── database.js         # MongoDB connection
│   ├── controllers/            # Route controllers
│   │   ├── authController.js   # Authentication logic
│   │   ├── orderController.js  # Order management
│   │   ├── paymentController.js # Payment processing
│   │   └── productController.js # Product management
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js             # Authentication middleware
│   │   ├── errorHandler.js     # Error handling
│   │   ├── security.js         # Security middleware
│   │   └── validation.js       # Request validation
│   ├── models/                 # Mongoose models
│   │   ├── User.js             # User schema
│   │   ├── Product.js          # Product schema
│   │   ├── Order.js            # Order schema
│   │   ├── Payment.js          # Payment schema
│   │   ├── Category.js         # Category schema
│   │   └── Review.js           # Review schema (no API endpoints yet)
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js       # Auth endpoints
│   │   ├── orderRoutes.js      # Order endpoints
│   │   ├── paymentRoutes.js    # Payment endpoints
│   │   └── productRoutes.js    # Product endpoints
│   ├── services/               # Business logic services
│   │   └── blockchainService.js # Blockchain verification (basic)
│   ├── utils/                  # Utility functions
│   │   ├── jwt.js              # JWT token management
│   │   ├── logger.js           # Winston logger
│   │   └── seedData.js         # Database seeding
│   └── app.js                  # Express app configuration
├── tests/                      # Test files
│   ├── setup.js                # Test configuration
│   ├── auth.test.js            # Auth tests
│   └── products.test.js        # Product tests
├── public/                     # Frontend files
│   ├── index.html              # Main HTML
│   ├── css/                    # Stylesheets
│   └── js/                     # Client-side JavaScript
├── logs/                       # Log files (generated)
├── server-new.js               # Production server entry point (v2.0)
├── server.js                   # Legacy server (v1.0 - in-memory storage)
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose setup
├── jest.config.js              # Jest configuration
├── package.json                # Dependencies
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🔒 Security Features

### Implemented Security Measures

1. **Helmet** - Sets security-related HTTP headers
2. **Rate Limiting** - Prevents brute force attacks
3. **Input Validation** - Joi schema validation
5. **HPP Protection** - Prevents HTTP parameter pollution
6. **JWT Authentication** - Secure token-based auth
7. **Password Hashing** - Bcrypt with salt rounds
8. **CORS Configuration** - Cross-origin resource sharing
9. **Error Handling** - Proper error messages without leaking details
10. **Logging** - Winston logging for audit trails

**Note on Blockchain Verification**: The application includes a blockchain service with functions to verify BTC, ETH, and USDT transactions using public APIs (blockchain.info, Etherscan-compatible APIs). However, this is a basic implementation and should not be considered production-ready. It lacks real-time monitoring, webhook support, and robust error handling needed for production use.

### Production Readiness Checklist

⚠️ **This application is NOT ready for production.** Before considering production deployment:

**Security & Configuration:**
- [ ] Change all default secrets in `.env`
- [ ] Use HTTPS/TLS encryption
- [ ] Set up proper MongoDB authentication
- [ ] Configure firewall rules
- [ ] Enable MongoDB replica set for production
- [ ] Set up automated backups
- [ ] Configure monitoring and alerting
- [ ] Complete comprehensive security audit
- [ ] Review and audit all security settings

**Missing/Incomplete Features:**
- [ ] Implement robust blockchain verification (current implementation is basic)
- [ ] Implement email service for notifications
- [ ] Add review and rating API endpoints
- [ ] Add category management API endpoints
- [ ] Implement shopping cart functionality
- [ ] Add comprehensive test coverage
- [ ] Build admin dashboard UI
- [ ] Implement real-time payment monitoring

**Infrastructure:**
- [ ] Configure CDN for static assets
- [ ] Enable request logging to external service
- [ ] Set up CI/CD pipeline properly
- [ ] Configure production monitoring and alerting

## 🧪 Testing

The application includes a basic test suite covering:

- User authentication (registration, login)
- JWT token validation
- Product CRUD operations
- Order management (create, get, update, list)
- Payment processing (confirm, verify, list)
- Cryptocurrency endpoints
- Health check endpoint
- Role-based access control
- Input validation
- Error handling
- Complete integration flows

### Running Tests

**Note**: Tests require MongoDB to be running. You can either:

1. Install and run MongoDB locally:
   ```bash
   # On Ubuntu/Debian
   sudo apt-get install mongodb
   sudo systemctl start mongodb
   
   # On macOS with Homebrew
   brew install mongodb-community
   brew services start mongodb-community
   ```

2. Use Docker to run MongoDB:
   ```bash
   docker run -d -p 27017:27017 --name mongo-test mongo:latest
   ```

Then run the tests:

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Test Files

- `tests/auth.test.js` - Authentication endpoint tests
- `tests/products.test.js` - Product management tests
- `tests/orders.test.js` - Order management tests
- `tests/payments.test.js` - Payment processing tests
- `tests/crypto.test.js` - Cryptocurrency and health endpoint tests
- `tests/integration.test.js` - End-to-end integration tests

**Note**: Test coverage is not comprehensive. Many features and edge cases are not yet tested.

## 🐳 Docker Deployment

### Environment Variables for Docker

Create a `.env` file for Docker Compose:

```env
# MongoDB
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=strongpassword

# Application
JWT_SECRET=super-secret-jwt-key-at-least-32-chars
JWT_REFRESH_SECRET=super-secret-refresh-key-at-least-32-chars
BTC_ADDRESS=your-btc-address
ETH_ADDRESS=your-eth-address
USDT_ADDRESS=your-usdt-address
SEED_DATA=true
LOG_LEVEL=info
PORT=3000
```

### Docker Commands

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f app

# Restart application
docker-compose restart app

# Stop all services
docker-compose down

# Remove volumes (careful: deletes data)
docker-compose down -v

# Run tests in Docker
docker-compose run app npm test
```

## 📊 Database Seeding

On first run with `SEED_DATA=true`, the application will automatically create:

- **5 Products** in different categories
- **3 Categories** (Computers, Electronics, Accessories)
- **1 Admin User** (email: `admin@cstore.com`, password: `admin123`)

**⚠️ Important**: Change the default admin password immediately in production!

## 🚀 Planned Features & Enhancements

The following features are planned for future versions but **are NOT currently implemented**:

### Phase 2: Enhanced Blockchain Integration
- [ ] Real-time payment confirmation monitoring
- [ ] Webhook support for payment notifications
- [ ] Multi-signature wallet support
- [ ] Integration with Bitcoin Core RPC (currently uses public APIs)
- [ ] Improved transaction verification with configurable confirmation requirements

### Phase 3: Advanced Features
- [ ] Product reviews and ratings API endpoints (model exists, API needed)
- [ ] Shopping cart functionality
- [ ] Wishlist feature
- [ ] Category management API endpoints (model exists, API needed)
- [ ] Advanced search with Elasticsearch
- [ ] Product recommendations
- [ ] Inventory management features

### Phase 4: Communication
- [ ] Email notifications (SendGrid/Nodemailer)
- [ ] Order confirmation emails
- [ ] Payment receipt emails
- [ ] Shipping notifications
- [ ] Admin alerts

### Phase 5: Admin Dashboard
- [ ] React-based admin panel
- [ ] Sales analytics and reports
- [ ] User management interface
- [ ] Product management UI
- [ ] Order tracking dashboard

### Phase 6: DevOps & CI/CD
- [ ] Complete GitHub Actions CI/CD pipeline configuration (basic workflow files exist)
- [ ] Automated testing in CI
- [ ] Docker image optimization
- [ ] Kubernetes deployment manifests
- [ ] Prometheus metrics integration
- [ ] Grafana dashboards

## 📝 Migration from v1.0 to v2.0

The v2.0 server is now the default (accessed via `npm start`).

The old server (v1.0) is still available for compatibility:

```bash
# Run legacy version (in-memory storage)
npm run start:legacy

# Run production version (MongoDB persistence)
npm start
```

v2.0 adds:
- Database persistence with MongoDB
- User authentication
- Enhanced security
- Better error handling
- More structured API

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

ISC License - see LICENSE file for details

## ⚠️ Important Disclaimer

**This application is NOT production-ready.** Before considering any production use:

- **In Development**: Many features are incomplete or missing (see Project Status section above)
- **Not Financial Advice**: This is educational software
- **Security Audit Required**: Conduct thorough security audits before any production use
- **Blockchain Integration**: Current blockchain verification is basic and uses public APIs. Implement robust blockchain verification for production
- **Testing Required**: Test coverage is incomplete. Thoroughly test all features in a staging environment
- **Compliance**: Ensure compliance with local regulations regarding cryptocurrency transactions
- **Email & Notifications**: No email system is currently implemented
- **Admin UI**: No admin dashboard interface exists (only API endpoints)

## 🆘 Support

For issues, questions, or contributions:

- **Issues**: [GitHub Issues](https://github.com/thewriterben/cstore/issues)
- **Documentation**: This README and inline code comments
- **Email**: Contact repository owner for critical issues

## 🙏 Acknowledgments

- Built with Express.js and MongoDB
- Security best practices from OWASP
- API design inspired by REST principles
- Testing patterns from Jest community

---

**Made with ❤️ for the crypto community**