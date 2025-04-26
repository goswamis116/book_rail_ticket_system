// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, showToast, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const handleShowTrainsClick = (e) => {
    if (!user) {
      e.preventDefault();
      showToast('Please login to view trains', 'error');
      navigate('/', { state: { from: '/show-trains' } });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#0836B1' }}>
      <div className="container-fluid" style={{ fontWeight: 'bold' }}>
        <Link className="navbar-brand" to="/">Book-Rail</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          disabled={isLoading}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/show-trains"
                onClick={handleShowTrainsClick}
                aria-disabled={!user}
              >
                Show Trains
                {isLoading && <span className="ms-2 spinner-border spinner-border-sm" role="status"></span>}
              </Link>
            </li>
            
            {/* Add Admin Portal link - only visible to admins */}
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin-portal">
                  Admin Portal
                </Link>
              </li>
            )}
            
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link" style={{ color: 'white' }}>
                    <i className="bi bi-person-circle me-2"></i>
                    {user.username}
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link" 
                    onClick={handleLogout}
                    style={{ color: 'white', textDecoration: 'none' }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging out...' : 'Logout'}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;