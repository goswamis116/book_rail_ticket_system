import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const ViewTrains = () => {
  const [trains, setTrains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useAuth();

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

  if (isLoading) return <div className="text-center my-5">Loading trains...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Trains</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Train No.</th>
              <th>Name</th>
              <th>Route</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Seats</th>
              <th>Fare</th>
            </tr>
          </thead>
          <tbody>
            {trains.map(train => (
              <tr key={train._id}>
                <td>{train.trainNumber}</td>
                <td>{train.trainName}</td>
                <td>{train.source} → {train.destination}</td>
                <td>{train.departureTime}</td>
                <td>{train.arrivalTime}</td>
                <td>{train.seatsAvailable}</td>
                <td>₹{train.fare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTrains;