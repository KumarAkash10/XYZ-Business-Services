import React from 'react';
import './BusinessCard.css';

const BusinessCard = ({ business }) => {
  const {
    id,
    name,
    description,
    category,
    address,
    phone,
    email,
    website,
    rating,
    image_url
  } = business;

  const handleContactClick = (type, value) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${value}`);
        break;
      case 'email':
        window.open(`mailto:${value}`);
        break;
      case 'website':
        window.open(value, '_blank');
        break;
      default:
        break;
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">★</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">★</span>
      );
    }

    return stars;
  };

  return (
    <div className="business-card">
      <div className="business-image">
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            onError={(e) => {
              console.log(`Failed to load image for ${name}:`, image_url);
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
            onLoad={() => {
              console.log(`Successfully loaded image for ${name}`);
            }}
          />
        ) : null}
        <div
          className="image-placeholder"
          style={{ display: image_url ? 'none' : 'flex' }}
        >
          <span>{name.charAt(0).toUpperCase()}</span>
        </div>
        <div className="category-badge">{category}</div>
      </div>

      <div className="business-content">
        <h3 className="business-name">{name}</h3>
        <p className="business-description">{description}</p>
        
        {rating && (
          <div className="rating">
            <div className="stars">
              {renderStars(rating)}
            </div>
            <span className="rating-value">({rating})</span>
          </div>
        )}

        <div className="business-details">
          {address && (
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span className="detail-text">{address}</span>
            </div>
          )}
          
          {phone && (
            <div 
              className="detail-item clickable"
              onClick={() => handleContactClick('phone', phone)}
            >
              <span className="detail-icon">📞</span>
              <span className="detail-text">{phone}</span>
            </div>
          )}
          
          {email && (
            <div 
              className="detail-item clickable"
              onClick={() => handleContactClick('email', email)}
            >
              <span className="detail-icon">✉️</span>
              <span className="detail-text">{email}</span>
            </div>
          )}
        </div>

        {website && (
          <button 
            className="visit-website-btn"
            onClick={() => handleContactClick('website', website)}
          >
            Visit Website
          </button>
        )}
      </div>
    </div>
  );
};

export default BusinessCard;
