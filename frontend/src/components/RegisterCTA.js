import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterCTA.css';

const RegisterCTA = () => {
  return (
    <section className="register-cta">
      <div className="container">
        <div className="cta-content">
          <div className="cta-text">
            <h2 className="cta-title">Ready to Grow Your Business?</h2>
            <p className="cta-description">
              Join thousands of businesses already listed on our platform. 
              Reach more customers and grow your business today!
            </p>
            <div className="cta-features">
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Free business listing</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Reach local customers</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Manage your business profile</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Get customer reviews</span>
              </div>
            </div>
          </div>
          
          <div className="cta-actions">
            <Link to="/add-business" className="cta-button primary">
              Register Your Business
            </Link>
            <Link to="/register" className="cta-button secondary">
              Create Account
            </Link>
          </div>
        </div>
        
        <div className="cta-stats">
          <div className="stat">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Businesses Listed</div>
          </div>
          <div className="stat">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Monthly Visitors</div>
          </div>
          <div className="stat">
            <div className="stat-number">4.8★</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterCTA;
