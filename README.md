# Cryptons.com

**Professional Cryptocurrency Trading Platform for Education and Development**

[![Version](https://img.shields.io/badge/version-2.2.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D16-brightgreen.svg)](package.json)
[![Status](https://img.shields.io/badge/status-Development-orange.svg)](README.md)

A full-featured cryptocurrency e-commerce platform with blockchain integration, multi-currency support, admin dashboard, and comprehensive compliance framework. Built with Node.js, Express, MongoDB, and React.

---

## ⚠️ CRITICAL PRODUCTION WARNING

**🚫 NOT PRODUCTION-READY FOR REAL CRYPTOCURRENCY TRANSACTIONS**

- **Current Status**: Development/Educational Platform (October 2025)
- **Production Readiness**: ~45%
- **Timeline to Production**: 18-36 months minimum
- **Estimated Cost**: $1.5-4M+ initial investment

### Required Before Production

**🔴 CRITICAL REQUIREMENTS**
- [ ] Security implementations (JWT revocation, database encryption, webhook security)
- [ ] Legal compliance (Money Transmitter Licenses in 48+ states, FinCEN registration)
- [ ] Professional security audit and penetration testing
- [ ] Disaster recovery and 24/7 monitoring

**⚖️ Legal Warning**: Operating without proper licenses is **ILLEGAL** and can result in criminal prosecution, asset seizure, and imprisonment.

**See**: [Production Readiness Checklist](#-production-readiness) | [Compliance Requirements](docs/compliance/COMPLIANCE_CHECKLIST.md)

---

## 🚀 Quick Start

### For Evaluators (2 minutes)
- **What is it?** Full-featured crypto e-commerce platform with Bitcoin, Lightning Network, multi-sig wallets
- **Status?** Feature-complete but requires security hardening and compliance for production
- **Tech Stack?** Node.js, Express, MongoDB, Redis, React, Kubernetes
- **View**: [Features](FEATURES.md) | [Architecture](ARCHITECTURE.md)

### For Developers (5 minutes)
```bash
# Clone and install
git clone https://github.com/thewriterben/cstore.git
cd cstore
npm install

# Configure
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start
npm run dev

# Test
npm test
```

**Next Steps**: [Getting Started Guide](GETTING_STARTED.md) | [API Documentation](docs/api/README.md)

### For Contributors
1. Review [CONTRIBUTING.md](CONTRIBUTING.md)
2. Check [GitHub Issues](https://github.com/thewriterben/cstore/issues) for tasks
3. Read [Development Workflow](CONTRIBUTING.md#contribution-workflow)

---

## ✨ Key Features

### Core E-commerce
✅ Product catalog with advanced search (Elasticsearch)  
✅ Shopping cart and order management  
✅ User authentication (JWT) and role-based access  
✅ Review & rating system  
✅ Multi-language support (5 languages)  
✅ Multi-currency pricing (10+ currencies)

### Cryptocurrency
✅ Bitcoin, Litecoin, XRP integration  
✅ Lightning Network for instant payments  
✅ Multi-signature wallets (2-of-3, 3-of-5)  
✅ Blockchain transaction verification  
✅ Real-time payment webhooks

### Admin Dashboard
✅ React-based management interface  
✅ Real-time analytics and charts  
✅ Product, order, and user management  
✅ Export functionality (CSV/PDF)  
✅ Drag-and-drop interfaces

### Compliance Framework (NEW v2.2.0)
✅ KYC/AML integration support  
✅ Transaction monitoring with ML-based risk scoring  
✅ GDPR compliance (data subject rights)  
✅ Automated regulatory reporting  
✅ Audit trail and compliance dashboard

### Infrastructure
✅ CI/CD pipeline with GitHub Actions  
✅ Kubernetes deployment manifests  
✅ Docker containerization  
✅ Prometheus + Grafana monitoring  
✅ Automated testing (Jest)

**Complete Feature List**: [FEATURES.md](FEATURES.md)

---

## 📚 Documentation

### Getting Started
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Quick setup guide (5 minutes)
- **[Installation Guide](docs/getting-started/INSTALLATION.md)** - Detailed installation
- **[FEATURES.md](FEATURES.md)** - Comprehensive feature documentation

### Technical
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and design
- **[API Documentation](docs/api/README.md)** - Complete API reference
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment and infrastructure guide

### Contributing
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[SECURITY.md](SECURITY.md)** - Security policy
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

### For Stakeholders
- **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - Master documentation index
- **[Compliance Checklist](docs/compliance/COMPLIANCE_CHECKLIST.md)** - Regulatory requirements
- **[Security Audit](audit/SECURITY_AUDIT.md)** - Security assessment
- **[Production Readiness](audit/PRODUCTION_READINESS.md)** - Production checklist

---

## 🛠 Technology Stack

**Backend**: Node.js 16+, Express.js, MongoDB, Redis, Elasticsearch  
**Frontend**: React 19, TypeScript, Material-UI, Redux Toolkit  
**Blockchain**: Bitcoin Core RPC, Lightning Network (LND)  
**Infrastructure**: Docker, Kubernetes, GitHub Actions, Prometheus, Grafana  
**Testing**: Jest, Supertest, K6 (performance)

**Details**: [ARCHITECTURE.md](ARCHITECTURE.md)

---

## 🤝 Contributing

We welcome contributions! Whether you're fixing bugs, adding features, improving documentation, or enhancing security.

**Quick Start**:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and add tests
4. Submit a pull request

**Guidelines**: [CONTRIBUTING.md](CONTRIBUTING.md)

**Good First Issues**: [GitHub Issues](https://github.com/thewriterben/cstore/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

---

## 📋 Production Readiness

**Status as of October 2025**: ~45% complete

### Critical Requirements (BLOCKING)

**Security** 🔴
- [ ] JWT token revocation system
- [ ] Database encryption at rest
- [ ] Webhook signature verification
- [ ] Production secrets management
- [ ] Professional security audit

**Compliance** 🔴
- [ ] Money Transmitter Licenses (48+ U.S. states)
- [ ] FinCEN MSB Registration
- [x] KYC/AML framework (complete)
- [ ] Terms of Service (legal review required)
- [ ] Privacy Policy (legal review required)

**Infrastructure** 🔴
- [ ] Load balancing and auto-scaling
- [ ] Disaster recovery procedures
- [ ] 24/7 monitoring and alerting
- [ ] Professional penetration testing

**Timeline**: 18-36 months | **Cost**: $1.5-4M+ | **Details**: [Production Readiness](audit/PRODUCTION_READINESS.md)

---

## 📄 License

ISC License - see [LICENSE](LICENSE) file for details

---

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/thewriterben/cstore/issues)
- **Discussions**: [GitHub Discussions](https://github.com/thewriterben/cstore/discussions)
- **Documentation**: [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

---

## ⚠️ Final Notice

**Educational Purpose**: This platform demonstrates modern cryptocurrency platform architecture, blockchain integration, and compliance framework development.

**Approved Use Cases**:
- ✅ Learning cryptocurrency platform development
- ✅ Educational demonstrations
- ✅ Portfolio projects
- ✅ Architecture study
- ✅ Testnet experimentation

**NOT Approved**:
- 🚫 Real cryptocurrency transactions
- 🚫 Production deployment without licenses
- 🚫 Handling real customer funds
- 🚫 Operating without legal counsel

**Made with ❤️ for the crypto community**

*Version 2.2.0 | Last Updated: October 2025*
