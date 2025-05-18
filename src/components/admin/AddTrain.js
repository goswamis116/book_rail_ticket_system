import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTrain = () => {
  const [trainData, setTrainData] = useState({
    trainNumber: '',
    trainName: '',
    source: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    seatsAvailable: 0,
    fare: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainData(prev => ({
      ...prev,
      [name]: name === 'seatsAvailable' || name === 'fare' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post('/api/admin/trains', trainData);
      showToast('Train added successfully!', 'success');
      navigate('/admin-portal');
    } catch (error) {
      showToast(
        error.response?.data?.message || 'Failed to add train', 
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Train</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Train Number */}
          <div className="col-md-6">
            <label className="form-label">Train Number*</label>
            <input
              type="text"
              className="form-control"
              name="trainNumber"
              value={trainData.trainNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Train Name */}
          <div className="col-md-6">
            <label className="form-label">Train Name*</label>
            <input
              type="text"
              className="form-control"
              name="trainName"
              value={trainData.trainName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Source Station */}
          <div className="col-md-6">
            <label className="form-label">Source Station*</label>
            <input
              type="text"
              className="form-control"
              name="source"
              value={trainData.source}
              onChange={handleChange}
              required
            />
          </div>

          {/* Destination Station */}
          <div className="col-md-6">
            <label className="form-label">Destination Station*</label>
            <input
              type="text"
              className="form-control"
              name="destination"
              value={trainData.destination}
              onChange={handleChange}
              required
            />
          </div>

          {/* Departure Time */}
          <div className="col-md-6">
            <label className="form-label">Departure Time*</label>
            <input
              type="time"
              className="form-control"
              name="departureTime"
              value={trainData.departureTime}
              onChange={handleChange}
              required
            />
          </div>

          {/* Arrival Time */}
          <div className="col-md-6">
            <label className="form-label">Arrival Time*</label>
            <input
              type="time"
              className="form-control"
              name="arrivalTime"
              value={trainData.arrivalTime}
              onChange={handleChange}
              required
            />
          </div>

          {/* Seats Available */}
          <div className="col-md-6">
            <label className="form-label">Seats Available*</label>
            <input
              type="number"
              className="form-control"
              name="seatsAvailable"
              value={trainData.seatsAvailable}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          {/* Fare */}
          <div className="col-md-6">
            <label className="form-label">Fare (₹)*</label>
            <input
              type="number"
              className="form-control"
              name="fare"
              value={trainData.fare}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="col-12">
            <button 
              type="submit" 
              className="btn btn-primary me-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                  Adding...
                </>
              ) : 'Add Train'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/admin-portal')}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTrain;