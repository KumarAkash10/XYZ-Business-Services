import { HTTP_STATUS } from '../constants/api';

/**
 * Centralized error handling utility for API responses
 * @param {Error} error - The error object from axios or other sources
 * @returns {string} - User-friendly error message
 */
export const handleApiError = (error) => {
  // Network error (no response received)
  if (error.request && !error.response) {
    return 'Unable to connect to server. Please check your internet connection.';
  }

  // Server responded with error status
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        return data.message || data.error || 'Invalid request. Please check your input.';
      
      case HTTP_STATUS.UNAUTHORIZED:
        return 'You are not authorized. Please log in again.';
      
      case HTTP_STATUS.FORBIDDEN:
        return 'You do not have permission to perform this action.';
      
      case HTTP_STATUS.NOT_FOUND:
        return 'The requested resource was not found.';
      
      case HTTP_STATUS.CONFLICT:
        return data.message || data.error || 'A conflict occurred. The resource may already exist.';
      
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return 'Server error. Please try again later.';
      
      default:
        return data.message || data.error || 'An unexpected error occurred.';
    }
  }

  // Generic error fallback
  return error.message || 'An unexpected error occurred.';
};

/**
 * Validates form data and returns validation errors
 * @param {Object} data - Form data to validate
 * @param {Object} rules - Validation rules
 * @returns {Object} - Validation errors object
 */
export const validateForm = (data, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = data[field];

    // Required field validation
    if (rule.required && (!value || value.trim() === '')) {
      errors[field] = `${rule.label || field} is required`;
      return;
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === '') {
      return;
    }

    // Minimum length validation
    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
    }

    // Maximum length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${rule.label || field} must not exceed ${rule.maxLength} characters`;
    }

    // Email validation
    if (rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field] = `${rule.label || field} must be a valid email address`;
    }

    // Phone validation
    if (rule.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
      errors[field] = `${rule.label || field} must be a valid phone number`;
    }

    // URL validation
    if (rule.url && !/^https?:\/\/.+\..+/.test(value)) {
      errors[field] = `${rule.label || field} must be a valid URL`;
    }
  });

  return errors;
};

/**
 * Checks if an object has any properties (used for validation errors)
 * @param {Object} obj - Object to check
 * @returns {boolean} - True if object has properties
 */
export const hasErrors = (obj) => {
  return Object.keys(obj).length > 0;
};
