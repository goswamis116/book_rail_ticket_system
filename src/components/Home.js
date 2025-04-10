import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import railImage from '../assets/images/homeImage.jpeg';
import googleLogo from '../assets/images/GoogleLogo.jpg';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRedirected, setIsRedirected] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Local loading state
  const { login, showToast, isLoading: authLoading } = useAuth(); // Renamed to avoid conflict
  const location = useLocation();
  const navigate = useNavigate();

  // Check if redirected from protected route
  useEffect(() => {
    if (location.state?.from && !isRedirected) {
      showToast('Please login to access that page', 'error');
      setIsRedirected(true);
    }
  }, [location.state, isRedirected, showToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const success = await login(username, password);
      if (success) {
        navigate(location.state?.from || '/show-trains'); // Navigate to the redirected path or /show-trains
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = () => {
    showToast('Google login is currently unavailable', 'info');
    console.log('Login with Google clicked');
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        {/* Left Side - Image */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img
            src={railImage}
            alt="Railway"
            className="img-fluid rounded shadow-3d"
          />
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card p-4 shadow-3d">
            <h2 className="text-center mb-4">Login to <span style={{fontWeight:'bold',color:'#0836B1' }}>Book-rail</span></h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoggingIn || authLoading}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoggingIn || authLoading}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-dark w-100 mb-3"
                disabled={isLoggingIn || authLoading}
              >
                {isLoggingIn ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : 'Login'}
              </button>
            </form>

            <div className="text-center mb-3">
              <p className="mb-0">
                Don't have an account?{' '}
                <a href="/register" className="text-decoration-none">Register</a>
              </p>
            </div>

            <div className="d-flex align-items-center mb-3">
              <hr className="flex-grow-1" />
              <span className="mx-2">OR</span>
              <hr className="flex-grow-1" />
            </div>

            <button
              className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center"
              onClick={handleGoogleLogin}
              disabled={isLoggingIn || authLoading}
            >
              <img
                src={googleLogo}
                alt="Google Logo"
                style={{ width: '20px', marginRight: '10px' }}
              />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;