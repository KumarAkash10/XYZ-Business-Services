const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { errorResponse } = require('../utils/responseHelper');

/**
 * Middleware to authenticate JWT token
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return errorResponse(res, 'Access token required', 401);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user still exists
    const user = await User.findByPk(decoded.userId, {
      attributes: ['id', 'email', 'user_type', 'is_verified']
    });

    if (!user) {
      return errorResponse(res, 'User not found', 401);
    }

    // Add user info to request
    req.user = {
      userId: user.id,
      email: user.email,
      userType: user.user_type,
      isVerified: user.is_verified
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, 'Invalid token', 401);
    }
    
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token expired', 401);
    }

    console.error('Auth middleware error:', error);
    return errorResponse(res, 'Authentication failed', 500);
  }
};

/**
 * Middleware to check if user is business owner
 */
const requireBusinessOwner = (req, res, next) => {
  if (req.user.userType !== 'business') {
    return errorResponse(res, 'Business owner access required', 403);
  }
  next();
};

/**
 * Middleware to check if user is admin
 */
const requireAdmin = (req, res, next) => {
  if (req.user.userType !== 'admin') {
    return errorResponse(res, 'Admin access required', 403);
  }
  next();
};

/**
 * Middleware to check if user is verified
 */
const requireVerified = (req, res, next) => {
  if (!req.user.isVerified) {
    return errorResponse(res, 'Email verification required', 403);
  }
  next();
};

/**
 * Optional authentication - doesn't fail if no token
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.userId, {
        attributes: ['id', 'email', 'user_type', 'is_verified']
      });

      if (user) {
        req.user = {
          userId: user.id,
          email: user.email,
          userType: user.user_type,
          isVerified: user.is_verified
        };
      }
    }

    next();
  } catch (error) {
    // Continue without authentication for optional auth
    next();
  }
};

module.exports = {
  authenticateToken,
  requireBusinessOwner,
  requireAdmin,
  requireVerified,
  optionalAuth
};
