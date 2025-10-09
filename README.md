# Cryptons.com - Professional Cryptocurrency Trading Platform

A full-featured cryptocurrency trading platform built with Node.js, Express, and MongoDB. This application includes JWT authentication, comprehensive blockchain integration, email notifications, shopping cart, reviews system, and admin dashboard API.

---

## 🚨 CRITICAL PRODUCTION WARNING

**⚠️ THIS PLATFORM IS NOT PRODUCTION-READY FOR REAL CRYPTOCURRENCY TRANSACTIONS ⚠️**

**Current Status (October 2025):** Version 2.2.0 - Development/Educational Platform  
**Production Readiness:** ~45% (Based on comprehensive security audit)

**⚠️ CRITICAL: As of October 2025, this platform remains NOT suitable for production use with real cryptocurrency transactions. Significant compliance, security, and legal requirements must be completed before any production deployment.**

### Before ANY Production Deployment:

1. **🔴 CRITICAL SECURITY IMPLEMENTATIONS REQUIRED**
   - [ ] JWT Token Revocation ([Implementation Guide](docs/security/JWT_TOKEN_REVOCATION.md))
   - [ ] Webhook Signature Verification ([Implementation Guide](docs/security/WEBHOOK_SECURITY.md))
   - [ ] Database Encryption at Rest ([Implementation Guide](docs/security/DATABASE_ENCRYPTION.md))
   - [ ] Production CORS Configuration ([Implementation Guide](docs/infrastructure/CORS_CONFIGURATION.md))
   - [ ] Secrets Management System ([Implementation Guide](docs/security/SECRETS_MANAGEMENT.md))

2. **🔴 LEGAL & COMPLIANCE REQUIREMENTS**
   - [ ] Money Transmitter Licenses (48+ U.S. states)
   - [ ] FinCEN MSB Registration (United States)
   - [ ] KYC/AML Program Implementation
   - [ ] Terms of Service (Legal Review Required)
   - [ ] Privacy Policy (Legal Review Required)
   - [ ] Compliance with local cryptocurrency regulations
   - **See:** [Compliance Checklist](docs/COMPLIANCE_CHECKLIST.md) for complete requirements

3. **🔴 SECURITY AUDITS & TESTING**
   - [ ] Professional penetration testing
   - [ ] Security audit by qualified firm
   - [ ] Load testing and stress testing
   - [ ] Disaster recovery testing
   - **See:** [Security Audit Report](audit/SECURITY_AUDIT.md)

4. **⚠️ ESTIMATED COSTS & TIMELINE (October 2025 Market Conditions)**
   - **Licensing & Compliance:** $1.2-3.5M initial + $800K-2.8M annual
   - **Security Implementation:** $75K-$200K
   - **Legal & Professional Services:** $150K-$600K
   - **Timeline to Production:** 18-36 months minimum from October 2025
   - **See:** [Compliance Checklist](docs/compliance/COMPLIANCE_CHECKLIST.md) for detailed breakdown

### ⚖️ Legal Disclaimer

**AS OF OCTOBER 2025:** Operating a cryptocurrency trading platform without proper licenses and compliance is **ILLEGAL** in most jurisdictions and can result in:
- Criminal prosecution
- Civil penalties (millions of dollars)
- Asset seizure
- Imprisonment
- Personal liability for operators

**DO NOT use this platform for real cryptocurrency transactions without:**
- Qualified legal counsel review (current with October 2025 regulations)
- All required licenses and registrations
- Comprehensive security implementation
- Professional security audits
- Adequate insurance and bonding

**This warning applies to the platform status as of October 2025 and remains in effect until all production requirements are met and properly certified.**

### 📚 Documentation

**For complete documentation, see [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)**

Quick Links:
- **[Security Documentation](docs/security/README.md)** - Security implementation and requirements
- **[Compliance Checklist](docs/compliance/COMPLIANCE_CHECKLIST.md)** - Legal and regulatory requirements
- **[API Documentation](docs/api/README.md)** - API reference and integration guides
- **[Audit Reports](audit/README.md)** - Security and compliance audit findings

---

## ⚠️ Project Status

**Version 2.2.0 - Feature Complete with Production Roadmap (October 2025)** 

This version includes all core e-commerce features and comprehensive documentation. However, as of October 2025, critical security implementations and regulatory compliance are still required before production use with real transactions. The platform remains in development/educational status and is NOT approved for production deployment.

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
- [x] Multi-signature wallet support (see [Multi-Sig Wallet Guide](docs/api/MULTI_SIG_WALLET.md))
- [x] Direct Bitcoin Core RPC integration (see [Bitcoin RPC Guide](docs/api/BITCOIN_RPC.md))
- [ ] Layer 2 payment solutions (Lightning Network)
- [x] Additional cryptocurrency support - LTC and XRP (see [Multi-Cryptocurrency Guide](docs/api/MULTI_CRYPTOCURRENCY.md))

### Phase 3: Admin Dashboard UI
- [x] React-based admin panel
- [x] Interactive sales charts and graphs
- [x] Real-time order notifications (Socket.io client ready)
- [x] Product management interface
- [x] Advanced analytics and reporting features
- [x] Drag-and-drop product management
- [x] CSV/PDF export features

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

The Cryptons.com platform now includes a modern React-based admin dashboard for managing your cryptocurrency trading platform.

### Features
- **Dashboard Overview**: Key metrics, sales trends, and recent orders at a glance
- **Sales Analytics**: Interactive charts showing sales by date and cryptocurrency distribution
- **Product Management**: Browse, search, and manage products with stock indicators
  - **Drag-and-Drop Reordering**: Reorder products by dragging and dropping them in the list
  - **Export**: Export products to CSV or PDF formats
- **Order Management**: View and filter orders by status with detailed information
  - **Export**: Export orders to CSV or PDF formats with filtering options
- **User Management**: Browse registered users and their account details
  - **Export**: Export user data to CSV format
- **System Health**: Monitor database, email service, memory usage, and server uptime

### Tech Stack
- React 19 with TypeScript
- Material-UI (MUI) v6 for components
- Redux Toolkit for state management
- Recharts for data visualization
- Axios for API integration
- @dnd-kit for drag-and-drop functionality
- Papaparse for CSV exports

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

## 📋 Production Readiness Checklist

**Status as of October 2025:** Before considering production deployment, ALL items below must be reviewed and completed. Current completion: ~45%

**⚠️ CRITICAL: Estimated timeline from October 2025 to production-ready: 18-36 months minimum**

### Security Implementation (REQUIRED - BLOCKING)
- [ ] [JWT Token Revocation](docs/security/JWT_TOKEN_REVOCATION.md) - Redis-based blacklist
- [ ] [Webhook Security](docs/security/WEBHOOK_SECURITY.md) - HMAC signature verification  
- [ ] [Database Encryption](docs/security/DATABASE_ENCRYPTION.md) - MongoDB encryption at rest
- [ ] [CORS Configuration](docs/infrastructure/CORS_CONFIGURATION.md) - Proper origin whitelisting
- [ ] [Secrets Management](docs/security/SECRETS_MANAGEMENT.md) - Vault or cloud KMS

### Compliance Requirements (REQUIRED - BLOCKING)
- [ ] Complete [Compliance Checklist](docs/compliance/COMPLIANCE_CHECKLIST.md) - Updated for October 2025 regulations
- [ ] Obtain all necessary licenses (18-24 month process from October 2025)
- [ ] Implement KYC/AML programs (current with 2025 requirements)
- [ ] Terms of Service (legal review with October 2025 regulations)
- [ ] Privacy Policy (legal review with October 2025 data protection laws)

### Infrastructure Hardening
- [ ] Load balancing and auto-scaling
- [ ] CDN for static assets
- [ ] Database replication and clustering
- [ ] Automated backups with testing
- [ ] Disaster recovery procedures
- [ ] Monitoring (Prometheus, Grafana)
- [ ] Centralized logging (ELK Stack)
- [ ] Error tracking (Sentry)

### Testing Requirements
- [ ] Professional penetration testing (October 2025 standards)
- [ ] Load and stress testing
- [ ] Security audit by qualified firm (with October 2025 compliance verification)
- [ ] All unit and integration tests passing
- [ ] Disaster recovery testing

### Legal and Insurance
- [ ] Legal counsel consultation (current with October 2025 cryptocurrency regulations)
- [ ] Required insurance policies (updated for 2025 market conditions)
- [ ] Regulatory compliance verification (October 2025 standards)
- [ ] Terms of Service finalized
- [ ] Privacy Policy finalized

**See [Production Readiness](audit/PRODUCTION_READINESS.md) for complete checklist with October 2025 updates.**

**⚠️ IMPORTANT:** The compliance landscape continues to evolve. All regulatory requirements must be verified as current as of your deployment date, not just October 2025.

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