import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const APP_URI = process.env.REACT_APP_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  const navigate = useNavigate();

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  }, []);

  // Parse JWT token without external library
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  };

  // Check auth status on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = parseJwt(token);
      // Basic expiration check (client-side only)
      if (decoded && decoded.exp > Date.now() / 1000) {
        setUser(decoded);
      } else {
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${APP_URI}/auth/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      const decoded = parseJwt(response.data.token);
      setUser(decoded);
      showToast('Login successful', 'success');
      return true;
    } catch (error) {
      showToast(error.response?.data?.message || 'Login failed', 'error');
      return false;
    }
  };

  const register = async (username, password, email, firstName, lastName) => {
    try {
      const response = await axios.post(`${APP_URI}/auth/register`, { username, password, email , firstName, lastName});
      localStorage.setItem('token', response.data.token);
      const decoded = parseJwt(response.data.token);
      setUser(decoded);
      return true;
    } catch (error) {
      showToast(error.response?.data?.message || 'Registration failed', 'error');
      return false;
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    showToast('You logged out successfully', 'success');
    navigate('/');
  }, [navigate, showToast]);

  // Axios request interceptor for auth tokens
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      register,
      showToast,
      toast
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);