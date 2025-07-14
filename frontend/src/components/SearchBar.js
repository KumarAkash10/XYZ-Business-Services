import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'retail', label: 'Retail' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'beauty', label: 'Beauty & Wellness' },
    { value: 'home', label: 'Home Services' },
    { value: 'professional', label: 'Professional Services' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, category);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Real-time search
    onSearch(value, category);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    onSearch(searchTerm, value);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Search for businesses, services..."
            value={searchTerm}
            onChange={handleInputChange}
            className="search-input"
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <button type="submit" className="search-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
