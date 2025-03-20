import React, { useState } from 'react';
import railImage from '../assets/images/homeImage.jpeg';
import googleLogo from '../assets/images/GoogleLogo.jpg'

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    // Add login logic here
  };

  const handleGoogleLogin = () => {
    console.log('Login with Google clicked');
    // Add Google login logic here
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        {/* Left Side - Image */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img
          src ={railImage}
            alt="Railway"
            className="img-fluid rounded shadow-3d"/>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card p-4 shadow-3d">
            <h2 className="text-center mb-4">Login to <span style={{fontWeight:'bold' }}>Book-rail</span></h2>
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
              <button type="submit" className="btn btn-dark w-100 mb-3">
                Login
              </button>
            </form>

            {/* "Don't have an account? Register" Link */}
            <div className="text-center mb-3">
              <p className="mb-0">
                Don't have an account?{' '}
                <a href="/register" className="text-decoration-none">Register</a>
              </p>
            </div>

            {/* Divider */}
            <div className="d-flex align-items-center mb-3">
              <hr className="flex-grow-1" />
              <span className="mx-2">OR</span>
              <hr className="flex-grow-1" />
            </div>

            {/* Login with Google Button */}
            <button
              className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center"
              onClick={handleGoogleLogin}
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