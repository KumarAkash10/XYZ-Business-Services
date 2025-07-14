import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import BusinessCard from '../components/BusinessCard';
import RegisterCTA from '../components/RegisterCTA';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import './Home.css';

const Home = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  // Listen for business updates (when user adds a business)
  useEffect(() => {
    const handleBusinessUpdate = () => {
      fetchBusinesses();
    };

    window.addEventListener('businessUpdate', handleBusinessUpdate);

    return () => {
      window.removeEventListener('businessUpdate', handleBusinessUpdate);
    };
  }, []);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.BUSINESSES.BASE}`);

      // Handle the new response structure from our backend
      const businessesData = response.data.data?.businesses || response.data.businesses || response.data;
      setBusinesses(businessesData);
      setFilteredBusinesses(businessesData);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to fetch businesses. Please try again later.');
      console.error('Error fetching businesses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm, category) => {
    let filtered = businesses;

    if (searchTerm) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category && category !== 'all') {
      filtered = filtered.filter(business =>
        business.category.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredBusinesses(filtered);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Find the Best Business Services</h1>
            <p className="hero-subtitle">
              Discover trusted local businesses and services in your area
            </p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Featured Businesses Section */}
      <section className="featured-businesses">
        <div className="container">
          <h2 className="section-title">Featured Businesses</h2>
          
          {loading && (
            <div className="loading">
              <p>Loading businesses...</p>
            </div>
          )}

          {error && (
            <div className="error">
              <p>{error}</p>
              <button onClick={fetchBusinesses} className="retry-btn">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="businesses-grid">
              {filteredBusinesses.filter(business => business.is_featured).length > 0 ? (
                filteredBusinesses.filter(business => business.is_featured).map(business => (
                  <BusinessCard key={business.id} business={business} />
                ))
              ) : (
                <div className="no-results">
                  <p>No featured businesses found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* All Businesses Section */}
      <section className="all-businesses">
        <div className="container">
          <h2 className="section-title">All Businesses</h2>

          {!loading && !error && (
            <div className="businesses-grid">
              {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map(business => (
                  <BusinessCard key={business.id} business={business} />
                ))
              ) : (
                <div className="no-results">
                  <p>No businesses found. Try adjusting your search criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Register CTA Section */}
      <RegisterCTA />
    </div>
  );
};

export default Home;
