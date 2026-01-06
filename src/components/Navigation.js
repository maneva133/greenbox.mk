import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const cartCount = getCartItemCount();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="logo">
          <h1>GreenBox.mk</h1>
        </Link>
        <ul className="nav-links">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
                  Cart ({cartCount})
                </Link>
              </li>
              <li>
                <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
                  Admin
                </Link>
              </li>
              <li className="user-info">
                <span className="username">👤 {user?.username}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;

