// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    ME: '/api/auth/me',
    LOGOUT: '/api/auth/logout',
    CHANGE_PASSWORD: '/api/auth/change-password'
  },
  
  // Businesses
  BUSINESSES: {
    BASE: '/api/businesses',
    CATEGORIES: '/api/businesses/categories',
    CITIES: '/api/businesses/cities',
    FEATURED: '/api/businesses/featured',
    BY_ID: (id) => `/api/businesses/${id}`
  },
  
  // Users
  USERS: {
    PROFILE: '/api/users/profile',
    BUSINESSES: '/api/users/businesses',
    REVIEWS: '/api/users/reviews'
  },
  
  // Health
  HEALTH: '/health'
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

// Request Configuration
export const REQUEST_CONFIG = {
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json'
  }
};
