import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import ShowTrains from './components/ShowTrains';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast'; // Add the Toast component

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App d-flex flex-column min-vh-100">
          <Navbar />
          <Toast /> {/* Add Toast here - will render conditionally */}
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/show-trains" 
                element={
                  <ProtectedRoute>
                    <ShowTrains />
                  </ProtectedRoute>
                } 
              />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;