const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables first
dotenv.config();

// Import utilities and middleware
const { initializeDatabase } = require('./config/database');

// Import routes
const businessRoutes = require('./routes/businesses');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database
initializeDatabase()
  .then(() => {
    console.log('Database initialized successfully');
  })
  .catch((error) => {
    console.error('Database initialization failed:', error.message);
    // Don't exit, continue without database for now
  });

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/businesses', businessRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check endpoints
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// API Documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Business Directory API - Industry Standard MVC Architecture',
    version: '1.0.0',
    documentation: {
      endpoints: {
        businesses: {
          base: '/api/businesses',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          description: 'Business management endpoints'
        },
        auth: {
          base: '/api/auth',
          methods: ['POST'],
          description: 'Authentication endpoints'
        },
        users: {
          base: '/api/users',
          methods: ['GET', 'PUT', 'DELETE'],
          description: 'User management endpoints'
        },
        reviews: {
          base: '/api/reviews',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          description: 'Review management endpoints'
        }
      },
      features: [
        'JWT Authentication',
        'Rate Limiting',
        'Input Validation',
        'Error Handling',
        'Logging',
        'Security Headers',
        'CORS Protection',
        'Request Compression'
      ]
    },
    architecture: {
      pattern: 'MVC (Model-View-Controller)',
      database: 'PostgreSQL with Sequelize ORM',
      validation: 'Express Validator',
      security: 'Helmet.js + Custom Middleware',
      logging: 'Custom Logger with File Output'
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Business Directory API',
    version: '1.0.0',
    documentation: '/api',
    health: '/health'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', {
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: err.message,
      details: process.env.NODE_ENV === 'development' ? err.details : undefined
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      error: 'Authentication Failed',
      message: 'Invalid or expired token'
    });
  }

  if (err.name === 'SequelizeConnectionError') {
    return res.status(503).json({
      success: false,
      error: 'Service Unavailable',
      message: 'Database connection error. Please try again later.'
    });
  }

  // Generic error response
  return res.status(err.status || 500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏗️  Architecture: MVC with Sequelize ORM`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
});

module.exports = { app, server };
