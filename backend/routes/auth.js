const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require('../models');

// POST /api/auth/register - Register a new user
router.post('/register', async (req, res) => {
  try {
    // Extract user data from request body
    const { firstName, lastName, email, password, userType = 'customer' } = req.body;

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'password'];
    const missingFields = requiredFields.filter(field => !req.body[field] || req.body[field].trim() === '');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Missing required fields',
        missingFields: missingFields
      });
    }

    // Validate field lengths and formats
    if (firstName.length < 2 || firstName.length > 50) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'First name must be between 2 and 50 characters'
      });
    }

    if (lastName.length < 2 || lastName.length > 50) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Last name must be between 2 and 50 characters'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Please provide a valid email address'
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: email.toLowerCase().trim()
      }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Conflict',
        message: 'An account with this email already exists'
      });
    }

    // Hash password securely
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password.trim(), saltRounds);

    // Create new user in database
    const user = await User.create({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.toLowerCase().trim(),
      password_hash: passwordHash,
      user_type: userType
    });

    // Generate JWT token
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      userType: user.user_type
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        issuer: 'listindia-api',
        audience: 'listindia-frontend'
      }
    );

    // Prepare user data for response (exclude sensitive information)
    const userData = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      userType: user.user_type,
      createdAt: user.created_at
    };

    // Send successful response
    return res.status(201).json({
      success: true,
      data: {
        user: userData,
        token: token
      },
      message: 'User registered successfully'
    });

  } catch (error) {
    console.error('Error registering user:', error);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => ({
        field: err.path,
        message: err.message,
        value: err.value
      }));

      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'User data validation failed',
        validationErrors: validationErrors
      });
    }

    // Handle Sequelize unique constraint errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        error: 'Conflict',
        message: 'An account with this email already exists'
      });
    }

    // Handle database connection errors
    if (error.name === 'SequelizeConnectionError') {
      return res.status(503).json({
        success: false,
        error: 'Service Unavailable',
        message: 'Database connection error. Please try again later.'
      });
    }

    // Generic error handler
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to register user',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/auth/login - Login user
router.post('/login', async (req, res) => {
  try {
    // Extract credentials from request body
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Email and password are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Please provide a valid email address'
      });
    }

    // Find user by email
    const user = await User.findOne({
      where: {
        email: email.toLowerCase().trim()
      },
      attributes: ['id', 'first_name', 'last_name', 'email', 'password_hash', 'user_type', 'is_verified', 'created_at']
    });

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication Failed',
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password.trim(), user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Authentication Failed',
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      userType: user.user_type
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        issuer: 'listindia-api',
        audience: 'listindia-frontend'
      }
    );

    // Prepare user data for response (exclude sensitive information)
    const userData = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      userType: user.user_type,
      isVerified: user.is_verified,
      createdAt: user.created_at
    };

    // Send successful response
    return res.status(200).json({
      success: true,
      data: {
        user: userData,
        token: token
      },
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Error logging in user:', error);

    // Handle database connection errors
    if (error.name === 'SequelizeConnectionError') {
      return res.status(503).json({
        success: false,
        error: 'Service Unavailable',
        message: 'Database connection error. Please try again later.'
      });
    }

    // Generic error handler
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to login',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/auth/me - Get current user info (requires authentication)
router.get('/me', async (req, res) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authentication Required',
        message: 'No valid authorization token provided'
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Authentication Required',
        message: 'No token provided'
      });
    }

    // Verify and decode JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database
    const user = await User.findByPk(decoded.userId, {
      attributes: ['id', 'first_name', 'last_name', 'email', 'user_type', 'is_verified', 'created_at', 'updated_at']
    });

    // Check if user still exists
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'User account not found'
      });
    }

    // Prepare user data for response
    const userData = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      userType: user.user_type,
      isVerified: user.is_verified,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    };

    // Send successful response
    return res.status(200).json({
      success: true,
      data: {
        user: userData
      },
      message: 'User information retrieved successfully'
    });

  } catch (error) {
    console.error('Error getting user info:', error);

    // Handle JWT-specific errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Authentication Failed',
        message: 'Invalid token format'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Authentication Failed',
        message: 'Token has expired. Please login again.'
      });
    }

    if (error.name === 'NotBeforeError') {
      return res.status(401).json({
        success: false,
        error: 'Authentication Failed',
        message: 'Token not active yet'
      });
    }

    // Handle database connection errors
    if (error.name === 'SequelizeConnectionError') {
      return res.status(503).json({
        success: false,
        error: 'Service Unavailable',
        message: 'Database connection error. Please try again later.'
      });
    }

    // Generic error handler
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to get user information',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
