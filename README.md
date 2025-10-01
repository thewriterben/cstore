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
- **Products**: Full CRUD, Search, Filter, Pagination, Suggestions (Autocomplete), Elasticsearch Sync
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