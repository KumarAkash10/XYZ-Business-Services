import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, REQUEST_CONFIG } from '../constants/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_CONFIG.TIMEOUT,
  headers: REQUEST_CONFIG.HEADERS
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  register: (userData) => apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData),
  login: (credentials) => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
  getProfile: () => apiClient.get(API_ENDPOINTS.AUTH.ME),
  logout: () => apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
};

// Business API calls
export const businessAPI = {
  getAll: (params = {}) => apiClient.get(API_ENDPOINTS.BUSINESSES.BASE, { params }),
  getById: (id) => apiClient.get(API_ENDPOINTS.BUSINESSES.BY_ID(id)),
  create: (businessData) => apiClient.post(API_ENDPOINTS.BUSINESSES.BASE, businessData),
  update: (id, businessData) => apiClient.put(API_ENDPOINTS.BUSINESSES.BY_ID(id), businessData),
  delete: (id) => apiClient.delete(API_ENDPOINTS.BUSINESSES.BY_ID(id)),
  getCategories: () => apiClient.get(API_ENDPOINTS.BUSINESSES.CATEGORIES),
  getCities: () => apiClient.get(API_ENDPOINTS.BUSINESSES.CITIES),
  getFeatured: () => apiClient.get(API_ENDPOINTS.BUSINESSES.FEATURED)
};

// User API calls
export const userAPI = {
  getProfile: () => apiClient.get(API_ENDPOINTS.USERS.PROFILE),
  updateProfile: (userData) => apiClient.put(API_ENDPOINTS.USERS.PROFILE, userData),
  getBusinesses: () => apiClient.get(API_ENDPOINTS.USERS.BUSINESSES),
  getReviews: () => apiClient.get(API_ENDPOINTS.USERS.REVIEWS)
};

// Health check
export const healthAPI = {
  check: () => apiClient.get(API_ENDPOINTS.HEALTH)
};

export default apiClient;
