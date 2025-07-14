import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing user data');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    // Check auth status on component mount
    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuthStatus();
      }
    };

    // Listen for custom auth events
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setIsMenuOpen(false);

    // Trigger auth change event
    window.dispatchEvent(new Event('authChange'));

    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" className="logo-link">
              <h1>XYZ Business Services</h1>
            </Link>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <span className="nav-welcome">
                      Welcome, {user?.firstName || user?.email || 'User'}!
                    </span>
                  </li>
                  <li className="nav-item">
                    <Link to="/add-business" className="nav-link btn-primary">Add Business</Link>
                  </li>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="nav-link logout-btn">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/add-business" className="nav-link btn-primary">Add Business</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <button 
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
