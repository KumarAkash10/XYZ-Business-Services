import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import './AddBusiness.css';

const AddBusiness = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const categories = [
    'restaurant',
    'retail',
    'healthcare',
    'education',
    'technology',
    'finance',
    'automotive',
    'beauty',
    'home',
    'professional'
  ];

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
    setSuccess(false);

    try {
      // Get authentication token
      const token = localStorage.getItem('token');

      // Prepare business data for API
      const businessData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        image_url: formData.image_url
      };

      // Make API call to backend
      await axios.post(`${API_BASE_URL}${API_ENDPOINTS.BUSINESSES.BASE}`, businessData, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });

      setSuccess(true);
      setError('');

      // Trigger business update event
      window.dispatchEvent(new Event('businessUpdate'));

      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        email: '',
        website: '',
        image_url: ''
      });

      // Redirect to home page after 2 seconds to see the new business
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        const errorMessage = err.response.data.error || err.response.data.message || 'Failed to register business';
        setError(errorMessage);
      } else if (err.request) {
        // Request was made but no response received
        setError('Unable to connect to server. Please check your connection.');
      } else {
        // Something else happened
        setError('Failed to register business. Please try again.');
      }

      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="add-business-container">
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h2>Business Registered Successfully!</h2>
          <p>Your business has been submitted for review. We'll notify you once it's approved and live on our platform.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="btn-primary"
          >
            Add Another Business
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-business-container">
      <div className="add-business-header">
        <h1>Register Your Business</h1>
        <p>Join our platform and reach more customers</p>
      </div>

      <form onSubmit={handleSubmit} className="add-business-form">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label htmlFor="name">Business Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your business name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describe your business and services"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="image_url">Business Image URL</label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/your-business-image.jpg"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Location</h3>
          
          <div className="form-group">
            <label htmlFor="address">Street Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter your business address"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="City"
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="State"
              />
            </div>

            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code *</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                placeholder="ZIP Code"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 12345 67890"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="business@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://www.yourbusiness.com"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Registering Business...' : 'Register Business'}
        </button>
      </form>
    </div>
  );
};

export default AddBusiness;
