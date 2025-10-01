# CStore - Production-Ready Cryptocurrency Marketplace

A comprehensive, secure cryptocurrency marketplace built with Node.js, Express, and MongoDB. This application features real blockchain integration capabilities, JWT authentication, comprehensive security measures, and a complete e-commerce backend.

## 🚀 Version 2.0 - Production Ready

This version includes major enhancements transforming the basic demo into a production-ready application:

### ✨ New Features

- 🔐 **JWT Authentication**: Secure user registration and login with bcrypt password hashing
- 💾 **MongoDB Integration**: Persistent data storage with Mongoose ODM
- 🛡️ **Advanced Security**: Helmet, rate limiting, input validation, and sanitization
- 📊 **Database Models**: Users, Products, Orders, Payments, Categories, Reviews
- 🔍 **Advanced Search**: Product filtering, sorting, and pagination
- 👤 **User Management**: User profiles, order history, and role-based access control
- 📦 **Order Management**: Complete order lifecycle with status tracking
- 💳 **Payment Processing**: Transaction verification and payment tracking
- 🧪 **Testing Suite**: Jest tests with Supertest for API testing
- 🐳 **Docker Support**: Multi-stage Dockerfile and Docker Compose setup
- 📝 **Logging**: Winston logger with file and console transports
- 🚦 **Error Handling**: Centralized error handling with proper HTTP status codes
- 📈 **Admin Features**: Admin-only endpoints for product and order management

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
- **Express Mongo Sanitize** - NoSQL injection prevention
- **HPP** - HTTP parameter pollution prevention

### Frontend
- **HTML5**, **CSS3**, **Vanilla JavaScript**
- Responsive design
- Clean, modern UI

### DevOps
- **Docker** & **Docker Compose**
- **Jest** & **Supertest** - Testing
- **GitHub Actions** ready (CI/CD pipeline configuration)

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

#### Development Mode (with auto-reload):
```bash
npm run dev
```

#### Production Mode (legacy server):
```bash
npm start
```

#### Production Mode (new architecture):
```bash
npm run start:new
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
│   │   └── Review.js           # Review schema
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js       # Auth endpoints
│   │   ├── orderRoutes.js      # Order endpoints
│   │   ├── paymentRoutes.js    # Payment endpoints
│   │   └── productRoutes.js    # Product endpoints
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
├── server.js                   # Legacy server (v1.0)
├── server-new.js               # New server entry point (v2.0)
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
4. **NoSQL Injection Prevention** - Express-mongo-sanitize
5. **HPP Protection** - Prevents HTTP parameter pollution
6. **JWT Authentication** - Secure token-based auth
7. **Password Hashing** - Bcrypt with salt rounds
8. **CORS Configuration** - Cross-origin resource sharing
9. **Error Handling** - Proper error messages without leaking details
10. **Logging** - Winston logging for audit trails

### Production Checklist

Before deploying to production:

- [ ] Change all default secrets in `.env`
- [ ] Use HTTPS/TLS encryption
- [ ] Set up proper MongoDB authentication
- [ ] Configure firewall rules
- [ ] Enable MongoDB replica set for production
- [ ] Set up automated backups
- [ ] Configure monitoring and alerting
- [ ] Review and audit all security settings
- [ ] Implement real blockchain verification
- [ ] Set up email service for notifications
- [ ] Configure CDN for static assets
- [ ] Enable request logging to external service

## 🧪 Testing

The application includes a comprehensive test suite covering:

- User authentication (registration, login)
- JWT token validation
- Product CRUD operations
- Role-based access control
- Input validation
- Error handling

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

Planned features for future versions:

### Phase 2: Real Blockchain Integration
- [ ] Web3.js integration for Ethereum transactions
- [ ] Bitcoin Core RPC for Bitcoin verification
- [ ] Real-time payment confirmation
- [ ] Webhook support for payment notifications
- [ ] Multi-signature wallet support

### Phase 3: Advanced Features
- [ ] Product reviews and ratings system
- [ ] Shopping cart functionality
- [ ] Wishlist feature
- [ ] Product categories and filters
- [ ] Advanced search with Elasticsearch
- [ ] Product recommendations
- [ ] Inventory management

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

### Phase 6: DevOps
- [ ] GitHub Actions CI/CD pipeline
- [ ] Automated testing in CI
- [ ] Docker image optimization
- [ ] Kubernetes deployment manifests
- [ ] Prometheus metrics
- [ ] Grafana dashboards

## 📝 Migration from v1.0 to v2.0

The old server (v1.0) is still available for compatibility:

```bash
# Run old version
npm start

# Run new version
npm run start:new
```

Both versions share the same frontend but v2.0 adds:
- Database persistence
- User authentication
- Enhanced security
- Better error handling
- Comprehensive API

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

ISC License - see LICENSE file for details

## ⚠️ Disclaimer

This application provides the infrastructure for a cryptocurrency marketplace. However:

- **Not Financial Advice**: This is educational software
- **Security Audit Required**: Conduct thorough security audits before production use
- **Blockchain Integration**: Implement real blockchain verification for production
- **Compliance**: Ensure compliance with local regulations regarding cryptocurrency transactions
- **Testing**: Thoroughly test all features in a staging environment

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