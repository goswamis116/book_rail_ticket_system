import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import ShowTrains from './components/ShowTrains';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast';
import AdminPortal from './components/AdminPortal';
import AddTrain from './components/admin/AddTrain';
import ModifyTrain from './components/admin/ModifyTrain';
import ModifyUser from './components/admin/ModifyUser';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App d-flex flex-column min-vh-100">
          <Navbar />
          <Toast />
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
              
              {/* Admin Routes */}
              <Route 
                path="/admin-portal" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminPortal />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-train" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AddTrain />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/modify-train" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <ModifyTrain />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/modify-user" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <ModifyUser />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;