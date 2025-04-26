import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AddTrain = () => {
  const [trainData, setTrainData] = useState({
    trainNumber: '',
    trainName: '',
    source: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    seatsAvailable: '',
    fare: ''
  });
  const { showToast } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to add train
      showToast('Train added successfully!', 'success');
      // Reset form
      setTrainData({
        trainNumber: '',
        trainName: '',
        source: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        seatsAvailable: '',
        fare: ''
      });
    } catch (error) {
      showToast('Failed to add train', 'error');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Train</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Train Number</label>
            <input
              type="text"
              className="form-control"
              name="trainNumber"
              value={trainData.trainNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Train Name</label>
            <input
              type="text"
              className="form-control"
              name="trainName"
              value={trainData.trainName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Source Station</label>
            <input
              type="text"
              className="form-control"
              name="source"
              value={trainData.source}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Destination Station</label>
            <input
              type="text"
              className="form-control"
              name="destination"
              value={trainData.destination}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Departure Time</label>
            <input
              type="time"
              className="form-control"
              name="departureTime"
              value={trainData.departureTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Arrival Time</label>
            <input
              type="time"
              className="form-control"
              name="arrivalTime"
              value={trainData.arrivalTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Seats Available</label>
            <input
              type="number"
              className="form-control"
              name="seatsAvailable"
              value={trainData.seatsAvailable}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Fare (₹)</label>
            <input
              type="number"
              className="form-control"
              name="fare"
              value={trainData.fare}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Update Train
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTrain;