# CStore Admin Dashboard

A modern, responsive React-based admin dashboard for the CStore cryptocurrency marketplace.

## Features

### Core Functionality
- 🔐 **JWT Authentication** - Secure admin login with token-based authentication
- 📊 **Dashboard Overview** - Key metrics and statistics at a glance
- 📈 **Sales Analytics** - Interactive charts with sales trends and revenue tracking
- 📦 **Product Management** - Browse, search, and manage products
- 🛒 **Order Management** - View and filter orders by status
- 👥 **User Management** - Browse users and their information
- ⚙️ **System Health** - Monitor database, email service, memory, and uptime

### Technical Stack
- **React 19** with TypeScript
- **Material-UI (MUI)** - Modern component library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Axios** - API client
- **Vite** - Build tool

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Backend API server running on `http://localhost:3000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env.development
```

Edit `.env.development` if your backend API runs on a different URL:
```
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

3. Start the development server:
```bash
npm run dev
```

The dashboard will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Authentication

The admin dashboard requires admin-level credentials to access. 

**Note:** Only users with the `admin` role can access the dashboard.

## Project Structure

```
admin-dashboard/
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── store/           # Redux store
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
└── dist/                # Production build
```

## New Features Added

### Pages
- **Reviews Page**: Moderate and approve user reviews with rating display
- **Analytics Page**: Advanced analytics with period selection and detailed charts
  - Average order value tracking
  - Transaction count monitoring
  - Revenue by cryptocurrency bar charts
  - Low stock product alerts
  - Most reviewed products tracking

### Real-time Features
- **WebSocket Notifications**: Integrated Socket.io for real-time updates
  - New order notifications
  - Payment confirmation alerts
  - Order status change notifications
  - System alerts and warnings
- **Toast Notifications**: Material-UI Snackbar alerts with auto-dismiss

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Accessing the Dashboard

Once the backend server is running, the admin dashboard is available at:
```
http://localhost:3000/admin
```

The backend automatically serves the built React application.

## License

This project is part of the CStore cryptocurrency marketplace.
