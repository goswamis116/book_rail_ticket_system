import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get('/api/admin/trains');
        setTrains(response.data);
        setIsLoading(false);
      } catch (error) {
        showToast('Failed to fetch trains', 'error');
        setIsLoading(false);
      }
    };

    fetchTrains();
  }, [showToast]);

  const handleDelete = async (trainId) => {
    if (window.confirm('Are you sure you want to delete this train?')) {
      try {
        await axios.delete(`/api/admin/trains/${trainId}`);
        setTrains(trains.filter(train => train._id !== trainId));
        showToast('Train deleted successfully', 'success');
      } catch (error) {
        showToast('Failed to delete train', 'error');
      }
    }
  };

  if (isLoading) return <div className="text-center my-5">Loading trains...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Trains</h2>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/admin/add-train')}
        >
          Add New Train
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Train No.</th>
              <th>Name</th>
              <th>Route</th>
              <th>Timings</th>
              <th>Seats</th>
              <th>Fare</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trains.map(train => (
              <tr key={train._id}>
                <td>{train.trainNumber}</td>
                <td>{train.trainName}</td>
                <td>{train.source} → {train.destination}</td>
                <td>
                  <div>Dep: {train.departureTime}</div>
                  <div>Arr: {train.arrivalTime}</div>
                </td>
                <td>{train.seatsAvailable}</td>
                <td>₹{train.fare}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => navigate(`/admin/modify-train/${train._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(train._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainList;