import { createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState({ 
    show: false, 
    message: '', 
    type: 'success'
  });

  // Dummy users database
  const [dummyUsers] = useState([
    { username: 'Santanu', password: '1234' },
    { username: 'user2', password: 'pass123' }
  ]);

  const navigate = useNavigate();

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  }, []);

  const login = (username, password) => {
    // Find user in dummy database
    const foundUser = dummyUsers.find(
      user => user.username === username && user.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      showToast('Login successful', 'success');
      navigate('/show-trains');
      return true;
    } else {
      showToast('Invalid username or password', 'error');
      return false;
    }
  };

  const logout = useCallback(() => {
    // First navigate, then update state
    navigate('/');
    // Use setTimeout to ensure navigation completes before state update
    setTimeout(() => {
      setUser(null);
      showToast('You logged out successfully', 'success');
    }, 100);
  }, [navigate, showToast]);

  const register = (username, password) => {
    // Check if username already exists
    const userExists = dummyUsers.some(user => user.username === username);
    
    if (userExists) {
      showToast('Username already exists', 'error');
      return false;
    }

    // Add new user (in a real app, this would go to backend)
    const newUser = { username, password };
    dummyUsers.push(newUser);
    setUser(newUser);
    showToast('Registration successful', 'success');
    navigate('/show-trains');
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register,
      toast,
      showToast,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);