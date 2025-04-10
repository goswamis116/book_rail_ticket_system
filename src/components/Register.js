import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import railImage from '../assets/images/homeImage.jpeg';
import googleLogo from '../assets/images/GoogleLogo.jpg';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register, showToast } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Client-side validation
      if (formData.password !== formData.confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
      }

      const success = await register(
        formData.username,
        formData.password,
        formData.email,
        formData.firstName,
        formData.lastName
      );

      if (success) {
        showToast('Registration successful !! Now login here', 'success');
        navigate('/');
      }
    } catch (error) {
      showToast(error.message || 'Registration failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    showToast('Google registration is currently unavailable', 'info');
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
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name:</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              </div>
              <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name:</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-dark w-100 mb-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Registering...
                  </>
                ) : 'Register'}
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
              disabled={isLoading}
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