import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    try {
      // Make API call to backend
      const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
        email: formData.email,
        password: formData.password
      });

      // Login successful

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
      setSuccess('Login successful! Redirecting...');
      setError('');

      // Redirect to home page after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (err) {
      // Handle login error

      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        const errorMessage = err.response.data.error || err.response.data.message || 'Login failed';
        setError(errorMessage);
      } else if (err.request) {
        // Request was made but no response received
        setError('Unable to connect to server. Please check your connection.');
      } else {
        // Something else happened
        setError('Login failed. Please try again.');
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
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="forgot-link">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? 
            <Link to="/register" className="auth-link"> Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
