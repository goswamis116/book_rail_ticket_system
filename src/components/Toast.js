import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;

// Get color based on toast type
const getBackgroundColor = (type) => {
  switch(type) {
    case 'error': return '#f44336'; // Red
    case 'warning': return '#ff9800'; // Orange
    case 'info': return '#2196F3'; // Blue
    default: return '#4CAF50'; // Green (success)
  }
};

// Get icon based on toast type
const getIcon = (type) => {
  switch(type) {
    case 'error': return '❌';
    case 'warning': return '⚠️';
    case 'info': return 'ℹ️';
    default: return '✓'; // success
  }
};

// Styled components
const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${props => getBackgroundColor(props.type)};
  color: white;
  padding: 15px 25px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-out, ${fadeOut} 0.5s ease-in 2.5s;
  animation-fill-mode: forwards;
  min-width: 250px;
`;

const ToastIcon = styled.span`
  font-size: 20px;
  margin-right: 10px;
`;

const ToastMessage = styled.span`
  font-size: 14px;
`;

const Toast = () => {
  const { toast } = useAuth();

  useEffect(() => {
    if (toast.show) {
      const audio = new Audio('/notification.mp3'); // path relative to public/
      audio.play().catch(err => console.error('Failed to play sound:', err));
    }
  }, [toast.show]); // triggers when toast.show changes

  if (!toast.show) return null;

  return (
    <ToastContainer type={toast.type}>
      <ToastIcon>{getIcon(toast.type)}</ToastIcon>
      <ToastMessage>{toast.message}</ToastMessage>
    </ToastContainer>
  );
};

export default Toast;
