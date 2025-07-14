const express = require('express');
const router = express.Router();
const { User, Business } = require('../models');
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authenticateToken = async (req, res, next) => {
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

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Continue to next middleware
    next();

  } catch (error) {
    console.error('Authentication error:', error);

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

    // Generic authentication error
    return res.status(401).json({
      success: false,
      error: 'Authentication Failed',
      message: 'Invalid or expired token'
    });
  }
};

// GET /api/users/profile - Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Fetch user profile from database
    const user = await User.findByPk(req.user.userId, {
      attributes: ['id', 'first_name', 'last_name', 'email', 'user_type', 'is_verified', 'created_at', 'updated_at']
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'User profile not found'
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
      message: 'User profile retrieved successfully'
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);

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
      message: 'Failed to fetch user profile',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PUT /api/users/profile - Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    // Extract profile data from request body
    const { firstName, lastName } = req.body;

    // Validate required fields
    if (!firstName || !lastName) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'First name and last name are required'
      });
    }

    // Validate field lengths
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

    // Update user profile in database
    const [updatedRowsCount, updatedUsers] = await User.update(
      {
        first_name: firstName.trim(),
        last_name: lastName.trim()
      },
      {
        where: { id: req.user.userId },
        returning: true
      }
    );

    // Check if user was found and updated
    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'User not found'
      });
    }

    // Prepare updated user data for response
    const user = updatedUsers[0];
    const userData = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      userType: user.user_type,
      updatedAt: user.updated_at
    };

    // Send successful response
    return res.status(200).json({
      success: true,
      data: {
        user: userData
      },
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Error updating user profile:', error);

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
        message: 'Profile data validation failed',
        validationErrors: validationErrors
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
      message: 'Failed to update user profile',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/users/businesses - Get businesses owned by user
router.get('/businesses', authenticateToken, async (req, res) => {
  try {
    // Extract pagination parameters
    const { limit = 20, offset = 0 } = req.query;
    const parsedLimit = Math.min(parseInt(limit) || 20, 50); // Max 50 items
    const parsedOffset = Math.max(parseInt(offset) || 0, 0);

    // Fetch user's businesses from database
    const [businesses, totalCount] = await Promise.all([
      Business.findAll({
        where: {
          owner_id: req.user.userId
        },
        order: [
          ['created_at', 'DESC'],
          ['updated_at', 'DESC']
        ],
        limit: parsedLimit,
        offset: parsedOffset,
        attributes: [
          'id', 'name', 'description', 'category', 'address', 'city', 'state', 'zip_code',
          'phone', 'email', 'website', 'image_url', 'rating', 'review_count',
          'is_featured', 'is_approved', 'created_at', 'updated_at'
        ]
      }),

      // Get total count for pagination
      Business.count({
        where: {
          owner_id: req.user.userId
        }
      })
    ]);

    // Calculate pagination info
    const hasMore = parsedOffset + parsedLimit < totalCount;
    const totalPages = Math.ceil(totalCount / parsedLimit);
    const currentPage = Math.floor(parsedOffset / parsedLimit) + 1;

    // Send successful response
    return res.status(200).json({
      success: true,
      data: {
        businesses: businesses,
        pagination: {
          total: totalCount,
          limit: parsedLimit,
          offset: parsedOffset,
          hasMore: hasMore,
          totalPages: totalPages,
          currentPage: currentPage
        }
      },
      message: 'User businesses retrieved successfully'
    });

  } catch (error) {
    console.error('Error fetching user businesses:', error);

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
      message: 'Failed to fetch user businesses',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
