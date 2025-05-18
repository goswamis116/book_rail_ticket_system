import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModifyTrain = () => {
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleEdit = (train) => {
    setSelectedTrain(train);
    setIsEditing(true);
  };

  const handleUpdate = async (updatedTrain) => {
    try {
      await axios.put(`/api/admin/trains/${updatedTrain._id}`, updatedTrain);
      setTrains(trains.map(t => t._id === updatedTrain._id ? updatedTrain : t));
      showToast('Train updated successfully!', 'success');
      setIsEditing(false);
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to update train', 'error');
    }
  };

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
      {isEditing ? (
        <TrainEditForm 
          train={selectedTrain} 
          onUpdate={handleUpdate} 
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h2 className="mb-4">Modify Trains</h2>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Train No.</th>
                  <th>Name</th>
                  <th>Route</th>
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
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => handleEdit(train)}
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
          <button 
            className="btn btn-secondary mt-3"
            onClick={() => navigate('/admin-portal')}
          >
            Back to Admin Portal
          </button>
        </>
      )}
    </div>
  );
};

const TrainEditForm = ({ train, onUpdate, onCancel }) => {
  const [trainData, setTrainData] = useState({ ...train });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(trainData);
  };

  return (
    <div>
      <h3 className="mb-4">Edit Train {train.trainNumber}</h3>
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
          {/* Include all other form fields similar to your AddTrain */}
          {/* ... */}
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary me-2">
              Update Train
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModifyTrain;