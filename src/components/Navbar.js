import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout,showToast  } = useAuth();

  const handleLogout = () => {
    logout();
  };
  
  const handleShowTrainsClick = (e) => {
    if (!user) {
      e.preventDefault();
      showToast('You should login first', 'error');
    }
    // If user is logged in, normal navigation will proceed
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
              <Link  className="nav-link" 
               to="/show-trains"
               onClick={handleShowTrainsClick}>
                Show Trains
              </Link>
            </li>
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
            
            {/* Conditional rendering based on authentication */}
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link" style={{ color: 'white' }}>
                    Welcome, {user.username}
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link" 
                    onClick={handleLogout}
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    Logout
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