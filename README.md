# CStore - Cryptocurrency Marketplace

A full-featured cryptocurrency marketplace built with Node.js, Express, and MongoDB. This application includes JWT authentication, comprehensive blockchain integration, email notifications, shopping cart, reviews system, and admin dashboard API.

## ⚠️ Project Status

**Version 2.1 - Feature Complete** 

This version includes all core e-commerce features. While functional, additional testing and hardening is recommended before production use.

## 🚀 Version 2.1 - Current Release

### ✅ Fully Implemented Features

#### Core E-commerce
- 🔐 **JWT Authentication**: Secure user registration and login with bcrypt password hashing
- 💾 **MongoDB Integration**: Persistent data storage with Mongoose ODM
- 🛡️ **Security**: Helmet, rate limiting, input validation, and sanitization
- 📊 **Complete Database Models**: Users, Products, Orders, Payments, Categories, Reviews, Shopping Cart
- 🔍 **Product Management**: Full CRUD operations with search, filtering, sorting, and pagination
- 👤 **User Management**: User profiles and role-based access control (admin/user)
- 📦 **Order Management**: Complete order lifecycle with status tracking
- 💳 **Payment Processing**: Payment confirmation with blockchain verification

#### New Features (v2.1)
- ⭐ **Review & Rating System**: Complete review CRUD operations with rating aggregation
- 📁 **Category Management**: Full category system with hierarchical support
- 🛒 **Shopping Cart**: Persistent cart with validation and stock management
- 📧 **Email Service**: Transactional emails (welcome, order confirmation, payment receipt, shipping notifications)
- 🔗 **Enhanced Blockchain**: Webhook support, real-time monitoring, retry mechanisms
- 📊 **Admin Dashboard API**: Complete admin endpoints for analytics, user management, and system monitoring
- 🎯 **Product Recommendations**: Personalized recommendations based on purchase history with collaborative filtering

#### Infrastructure
- 🧪 **Testing Suite**: Jest tests with Supertest for authentication and products
- 🐳 **Docker Support**: Dockerfile and Docker Compose configuration
- 📝 **Logging**: Winston logger with file and console transports
- 🚦 **Error Handling**: Centralized error handling middleware
- 📈 **Analytics**: Sales analytics, product analytics, and activity logging

### 🔧 Configuration Required

These features are implemented but require configuration:
- **Email Service**: Configure SMTP settings in `.env`
- **Blockchain Webhooks**: Set webhook URL for payment notifications
- **Admin Alerts**: Configure admin email for system alerts

### ❌ Not Yet Implemented (Future Enhancements)

- Wishlist feature
- Advanced search with Elasticsearch
- Admin dashboard UI (React-based panel)
- Multi-signature wallet support
- Internationalization (i18n)

## Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database and ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Winston** - Logging
- **Morgan** - HTTP request logging
- **Joi** - Request validation
- **Nodemailer** - Email service

### Security
- **Helmet** - Security headers
- **Express Rate Limit** - Rate limiting
- **Custom Sanitization** - NoSQL injection prevention (Express 5 compatible)
- **Custom XSS Protection** - Cross-site scripting prevention (Express 5 compatible)
- **HPP** - HTTP parameter pollution prevention

### Blockchain
- **Web3.js** - Ethereum interaction
- **Axios** - Blockchain API calls
- Support for BTC, ETH, and USDT

### Frontend
- **HTML5**, **CSS3**, **Vanilla JavaScript**
- Responsive design
- Clean, modern UI

### DevOps
- **Docker** & **Docker Compose**
- **Jest** & **Supertest** - Testing
- **GitHub Actions** - Basic CI/CD workflow files included

## 📖 Documentation

- **[API Endpoints](docs/API_ENDPOINTS.md)** - Complete API endpoint reference with examples
- **[Authentication System](docs/AUTHENTICATION.md)** - JWT authentication and RBAC guide
- **[API Documentation](docs/API.md)** - Detailed API documentation

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (v7.0 or higher) or Docker
- **npm** or **yarn**
- **SMTP Server** (optional, for email features)

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
# Server
PORT=3000
APP_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/cstore

# JWT Secrets (Generate strong secrets for production!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-change-in-production

# Email Configuration (Required for email features)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=noreply@cstore.example.com
ADMIN_EMAIL=admin@cstore.example.com

# Cryptocurrency Wallet Addresses (Replace with your own)
BTC_ADDRESS=your-btc-address
ETH_ADDRESS=your-eth-address
USDT_ADDRESS=your-usdt-address

# Blockchain Configuration (Optional)
VERIFY_BLOCKCHAIN=false
PAYMENT_WEBHOOK_URL=https://your-domain.com/webhook
WEBHOOK_SECRET=your-webhook-secret

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

#### Get Product Recommendations
```http
GET /api/products/recommendations?limit=10
Authorization: Bearer <token>
```

Returns personalized product recommendations based on user's purchase history.

#### Get Related Products
```http
GET /api/products/:id/related?limit=6
```

Returns products related to a specific product (same category).

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
2. **Rate Limiting** - Prevents brute force attacks (100 req/15min general, 5 req/15min auth)
3. **Input Validation** - Comprehensive Joi schema validation
4. **MongoDB Sanitization** - Custom Express 5-compatible NoSQL injection prevention
5. **XSS Protection** - Custom Express 5-compatible cross-site scripting prevention
6. **HPP Protection** - Prevents HTTP parameter pollution
7. **JWT Authentication** - Secure token-based authentication with refresh tokens
8. **Password Hashing** - Bcrypt with salt rounds
9. **CORS Configuration** - Configurable cross-origin resource sharing
10. **Error Handling** - Proper error messages without leaking sensitive details
11. **Logging** - Winston logging for comprehensive audit trails
12. **Role-Based Access Control** - User and Admin roles with proper authorization

### Blockchain Security

The application includes enhanced blockchain verification:
- Transaction verification for BTC, ETH, and USDT
- Retry mechanisms for failed verifications
- Webhook support for payment notifications
- Real-time payment monitoring
- Transaction status tracking
- Configurable confirmation requirements

**Note**: Blockchain verification uses public APIs and is suitable for moderate-volume applications. For high-volume production use, consider direct node connections or enterprise blockchain services.

### Production Readiness Checklist

⚠️ **Additional hardening recommended for production use:**

**Security & Configuration:**
- [x] JWT authentication with secure token handling
- [x] Password hashing with bcrypt
- [x] Input validation on all endpoints
- [x] Rate limiting configured
- [x] Error handling without information leakage
- [ ] Change all default secrets in `.env`
- [ ] Use HTTPS/TLS encryption (configure reverse proxy)
- [ ] Set up proper MongoDB authentication
- [ ] Configure firewall rules
- [ ] Enable MongoDB replica set
- [ ] Set up automated backups
- [ ] Configure monitoring and alerting
- [ ] Complete comprehensive security audit

**Feature Completeness:**
- [x] Authentication system
- [x] Product management
- [x] Order management
- [x] Payment processing
- [x] Review and rating system
- [x] Category management
- [x] Shopping cart
- [x] Email notifications
- [x] Admin dashboard API
- [x] Analytics and reporting
- [ ] Comprehensive integration tests
- [ ] Performance testing
- [ ] Load testing

**Infrastructure:**
- [x] Docker support
- [x] Environment configuration
- [x] Logging system
- [ ] Configure CDN for static assets
- [ ] Enable request logging to external service (e.g., Datadog, Sentry)
- [ ] Set up CI/CD pipeline
- [ ] Configure production monitoring (Prometheus, Grafana)
- [ ] Set up alerting system

## 🧪 Testing

The application includes a test suite covering:

- User authentication (registration, login, JWT validation)
- Product CRUD operations
- Order management (create, get, update, list)
- Payment processing (confirm, verify, list)
- Review system (create, read, update, delete)
- Category management
- Shopping cart operations
- Admin endpoints
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

## 🚀 Future Enhancements

The following features are planned for future versions:

### Phase 1: User Experience
- [ ] Wishlist feature
- [ ] Product comparison
- [ ] Advanced search with Elasticsearch
- [x] Product recommendations based on purchase history
- [ ] Customer product questions & answers

### Phase 2: Advanced Blockchain
- [ ] Multi-signature wallet support
- [ ] Direct Bitcoin Core RPC integration (currently uses public APIs)
- [ ] Layer 2 payment solutions (Lightning Network)
- [ ] Additional cryptocurrency support (LTC, XRP, etc.)

### Phase 3: Admin Dashboard UI
- [ ] React-based admin panel
- [ ] Interactive sales charts and graphs
- [ ] Real-time order notifications
- [ ] Drag-and-drop product management
- [ ] Advanced reporting and export features

### Phase 4: DevOps & Scaling
- [ ] Complete GitHub Actions CI/CD pipeline
- [ ] Kubernetes deployment manifests
- [ ] Prometheus metrics integration
- [ ] Grafana dashboards
- [ ] Redis caching layer
- [ ] CDN integration for static assets

### Phase 5: Internationalization
- [ ] Multi-language support (i18n)
- [ ] Multi-currency pricing
- [ ] Region-specific payment methods
- [ ] Localized email templates

## 📋 API Endpoints Summary

### Implemented Endpoints (v2.1)

- **Authentication**: Register, Login, Get Profile, Update Password
- **Products**: Full CRUD, Search, Filter, Pagination
- **Orders**: Create, Get, List, Update Status (Admin)
- **Payments**: Confirm, Verify, List (Admin)
- **Reviews**: Full CRUD, Ratings, Stats, Moderation (Admin)
- **Categories**: Full CRUD, Product Filtering
- **Shopping Cart**: Add, Update, Remove, Validate
- **Admin Dashboard**: Stats, Analytics, User Management, System Health

See [API_ENDPOINTS.md](docs/API_ENDPOINTS.md) for complete documentation.

## 📝 Migration Notes

### From v2.0 to v2.1

v2.1 adds significant new functionality:
- Review and rating system
- Category management API
- Shopping cart functionality
- Email notification service
- Enhanced blockchain monitoring
- Complete admin dashboard API

All v2.0 endpoints remain compatible. New endpoints are additive only.

**Database Migration**: No migration required. New collections (Cart) will be created automatically.

**Configuration**: Add email SMTP settings to `.env` file (see `.env.example`).

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

**This application is feature-complete but requires additional hardening for production use:**

- **Educational Purpose**: Primarily intended for learning and development
- **Not Financial Advice**: This is educational software for demonstration purposes
- **Security Audit Required**: Conduct thorough security audits before any production use
- **Testing Required**: Expand test coverage and perform load testing in staging environment
- **Compliance**: Ensure compliance with local regulations regarding cryptocurrency transactions
- **Blockchain Integration**: Uses public APIs suitable for moderate volume. Consider direct node connections for high-volume production
- **Email Service**: Requires SMTP configuration - test thoroughly before production use
- **Admin UI**: API endpoints implemented; web UI is not included
- **Monitoring**: Set up proper monitoring, alerting, and logging infrastructure for production

### Recommendations for Production

1. **Security**: Complete security audit, penetration testing
2. **Infrastructure**: Set up load balancing, CDN, caching layer
3. **Monitoring**: Implement comprehensive monitoring (Prometheus, Grafana, Sentry)
4. **Backups**: Automated database backups and disaster recovery plan
5. **Legal**: Consult with legal counsel regarding cryptocurrency regulations
6. **Testing**: Comprehensive integration, load, and security testing

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