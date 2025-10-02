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
- 🔎 **Advanced Search**: Elasticsearch integration for fuzzy search, typo tolerance, and better relevance
- 👤 **User Management**: User profiles and role-based access control (admin/user)
- 📦 **Order Management**: Complete order lifecycle with status tracking
- 💳 **Payment Processing**: Payment confirmation with blockchain verification

#### New Features (v2.1)
- ⭐ **Review & Rating System**: Complete review CRUD operations with rating aggregation
- 📁 **Category Management**: Full category system with hierarchical support
- 🛒 **Shopping Cart**: Persistent cart with validation and stock management
- ❤️ **Wishlist**: Save products for later with full CRUD operations
- 📧 **Email Service**: Transactional emails (welcome, order confirmation, payment receipt, shipping notifications)
- 🌐 **Internationalization (i18n)**: Multi-language support (English, Spanish, French, German, Chinese)
- 💱 **Multi-Currency Pricing**: Support for 10+ fiat currencies with real-time exchange rates
- 🌍 **Regional Payment Methods**: 15+ region-specific payment options (SEPA, iDEAL, Alipay, PIX, etc.)
- 🔗 **Enhanced Blockchain**: Webhook support, real-time monitoring, retry mechanisms
- 📊 **Admin Dashboard API**: Complete admin endpoints for analytics, user management, and system monitoring

#### Infrastructure
- 🧪 **Testing Suite**: Jest tests with Supertest for authentication and products
- 🐳 **Docker Support**: Multi-stage Dockerfile and Docker Compose configuration
- 📝 **Logging**: Winston logger with file and console transports
- 🚦 **Error Handling**: Centralized error handling middleware
- 📈 **Analytics**: Sales analytics, product analytics, and activity logging
- 🔄 **CI/CD Pipeline**: Comprehensive GitHub Actions workflows for testing, building, and deployment
- 🔒 **Security Automation**: GitLeaks, npm audit, and Trivy container scanning
- ⚡ **Performance Testing**: K6 load testing and stress testing
- 🚀 **Blue-Green Deployment**: Zero-downtime deployments with automatic rollback
- 🎨 **Code Quality**: ESLint and Prettier integration

### 🔧 Configuration Required

These features are implemented but require configuration:
- **Email Service**: Configure SMTP settings in `.env`
- **Blockchain Webhooks**: Set webhook URL for payment notifications
- **Admin Alerts**: Configure admin email for system alerts

### ❌ Not Yet Implemented (Future Enhancements)

### Phase 2: Advanced Blockchain
- [ ] Multi-signature wallet support
- [ ] Direct Bitcoin Core RPC integration (currently uses public APIs)
- [ ] Layer 2 payment solutions (Lightning Network)
- [ ] Additional cryptocurrency support (LTC, XRP, etc.)

### Phase 3: Admin Dashboard UI
- [x] React-based admin panel
- [x] Interactive sales charts and graphs
- [x] Real-time order notifications (Socket.io client ready)
- [x] Product management interface
- [x] Advanced analytics and reporting features
- [ ] Drag-and-drop product management (future enhancement)
- [ ] CSV/PDF export features (future enhancement)

### Phase 4: DevOps & Scaling
- [x] Complete GitHub Actions CI/CD pipeline
- [x] Multi-environment deployment (dev, staging, production)
- [x] Blue-green deployment strategy
- [x] Automated testing and linting
- [x] Security scanning (npm audit, Trivy, GitLeaks)
- [x] Performance testing with K6
- [x] Health checks and smoke tests
- [x] Deployment rollback capabilities
- [ ] Kubernetes deployment manifests
- [ ] Prometheus metrics integration
- [ ] Grafana dashboards
- [ ] Redis caching layer
- [ ] CDN integration for static assets

### Phase 5: Internationalization
- [x] Multi-language support (i18n)
- [x] Localized email templates
- [x] Multi-currency pricing
- [x] Region-specific payment methods

## 🎨 Admin Dashboard

The CStore platform now includes a modern React-based admin dashboard for managing your cryptocurrency marketplace.

### Features
- **Dashboard Overview**: Key metrics, sales trends, and recent orders at a glance
- **Sales Analytics**: Interactive charts showing sales by date and cryptocurrency distribution
- **Product Management**: Browse, search, and manage products with stock indicators
- **Order Management**: View and filter orders by status with detailed information
- **User Management**: Browse registered users and their account details
- **System Health**: Monitor database, email service, memory usage, and server uptime

### Tech Stack
- React 19 with TypeScript
- Material-UI (MUI) v6 for components
- Redux Toolkit for state management
- Recharts for data visualization
- Axios for API integration

### Getting Started

1. Navigate to the admin dashboard directory:
```bash
cd admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The dashboard will be available at `http://localhost:5173`

4. Build for production:
```bash
npm run build
```

### Authentication
Only users with the `admin` role can access the dashboard. Use your admin credentials from the main backend to log in.

For detailed documentation, see [admin-dashboard/README.md](admin-dashboard/README.md)

## 📋 API Endpoints Summary

### Implemented Endpoints (v2.1)

- **Authentication**: Register, Login, Get Profile, Update Password, Update Preferences
- **Products**: Full CRUD, Search, Filter, Pagination, Suggestions (Autocomplete), Elasticsearch Sync
- **Orders**: Create, Get, List, Update Status (Admin), Multi-Currency Support
- **Payments**: Confirm, Verify, List (Admin)
- **Reviews**: Full CRUD, Ratings, Stats, Moderation (Admin)
- **Categories**: Full CRUD, Product Filtering
- **Shopping Cart**: Add, Update, Remove, Validate, Multi-Currency Display
- **Currencies**: List, Convert, Exchange Rates, Historical Data (Admin)
- **Regional Payments**: Discovery, Filtering, Management (Admin)
- **Admin Dashboard**: Stats, Analytics, User Management, System Health
- **Multi-Sig Wallets**: Create, Manage, Transaction Approvals
- **Product Questions**: Ask, Answer, Vote Helpful, Moderation (Admin)

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
- Multi-signature wallet support with transaction approval workflow

All v2.0 endpoints remain compatible. New endpoints are additive only.

**Database Migration**: No migration required. New collections (Cart, MultiSigWallet, TransactionApproval) will be created automatically.

**Configuration**: Add email SMTP settings to `.env` file (see `.env.example`).

## 🔄 CI/CD Pipeline

The project includes a comprehensive CI/CD pipeline using GitHub Actions.

### Workflows

1. **CI Pipeline** (`.github/workflows/ci.yml`)
   - Automated linting with ESLint and Prettier
   - Jest tests with coverage reporting
   - Security scanning (npm audit, GitLeaks, Trivy)
   - Multi-version Node.js testing (18.x, 20.x)
   - Docker image building and caching

2. **Deployment Pipeline** (`.github/workflows/deploy.yml`)
   - Multi-environment support (development, staging, production)
   - Blue-green deployment strategy
   - Automated health checks and smoke tests
   - Gradual traffic shifting for production
   - Automatic rollback on failure
   - Database migration support

3. **Performance Testing** (`.github/workflows/performance.yml`)
   - K6 load testing
   - Stress testing
   - API benchmarking
   - Performance regression detection

### Deployment Environments

- **Development**: Auto-deploy from `develop` branch
- **Staging**: Auto-deploy from `main` branch
- **Production**: Deploy via git tags (e.g., `v1.0.0`)

### Scripts

Located in `scripts/deployment/`:
- `health-check.sh` - Application health validation
- `smoke-test.sh` - Basic functional tests
- `rollback.sh` - Automated rollback procedure

### Documentation

See [docs/CICD_PIPELINE.md](docs/CICD_PIPELINE.md) for comprehensive CI/CD documentation.

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