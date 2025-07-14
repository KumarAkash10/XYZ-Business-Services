import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'customer'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // Make API call to backend
      const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        userType: formData.userType
      });

      // Registration successful

      // Store the token in localStorage
      const token = response.data.data?.token || response.data.token;
      const user = response.data.data?.user || response.data.user;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Trigger auth change event to update header
        window.dispatchEvent(new Event('authChange'));
      }

      // Show success message
      setSuccess('Account created successfully! Redirecting...');
      setError('');

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      // Handle registration error

      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        const errorMessage = err.response.data.error || err.response.data.message || 'Registration failed';
        setError(errorMessage);
      } else if (err.request) {
        // Request was made but no response received
        setError('Unable to connect to server. Please check your connection.');
      } else {
        // Something else happened
        setError('Registration failed. Please try again.');
      }

      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join our business community</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter your first name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType">Account Type</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="customer">Customer</option>
              <option value="business">Business Owner</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a></span>
            </label>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? 
            <Link to="/login" className="auth-link"> Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
