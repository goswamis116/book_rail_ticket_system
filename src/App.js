import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import ShowTrains from './components/ShowTrains';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show-trains" element={<ShowTrains />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;