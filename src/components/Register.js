import React, { useState } from 'react';
import railImage from '../assets/images/homeImage.jpeg';
import googleLogo from '../assets/images/GoogleLogo.jpg';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
  
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
  
      if (!register(username, password, email)) {
        setError('Username already taken');
      }
    };

  const handleGoogleLogin = () => {
    console.log('Register with Google clicked');
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

        {/* Right Side - Registration Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card p-4 shadow-3d" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 className="text-center mb-4">Register for <span style={{ fontWeight: 'bold', color: '#0836B1' }}>Book-rail</span></h2>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
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
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-dark w-100 mb-3">
                Register
              </button>
            </form>

            <div className="text-center mb-3">
              <p className="mb-0">
                Already have an account?{' '}
                <a href="/" className="text-decoration-none">Login</a>
              </p>
            </div>

            <div className="d-flex align-items-center mb-3">
              <hr className="flex-grow-1" />
              <span className="mx-2">OR</span>
              <hr className="flex-grow-1" />
            </div>

            <button
              className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center mb-3"
              onClick={handleGoogleLogin}
            >
              <img
                src={googleLogo}
                alt="Google Logo"
                style={{ width: '20px', marginRight: '10px' }}
              />
              Register with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;