import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, showToast } = useAuth();

  if (!user) {
    showToast('You should login first', 'error');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;