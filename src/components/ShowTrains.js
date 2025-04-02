import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ShowTrains = () => {
  const { user } = useAuth();
  const [startStation, setStartStation] = useState('');
  const [destinationStation, setDestinationStation] = useState('');
  const [date, setDate] = useState('');
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);

  // Dummy train data
  const dummyTrains = [
    {
      id: 1,
      name: 'Katwa Express',
      start: 'Howrah',
      destination: 'Katwa',
      departure: '08:00 AM',
      arrival: '12:00 PM',
      seatsAvailable: 50,
      fare: 120
    },
    {
      id: 2,
      name: 'Superfast Bardhaman to Howrah 202',
      start: 'Bardhaman',
      destination: 'Howrah',
      departure: '09:00 AM',
      arrival: '01:00 PM',
      seatsAvailable: 30,
      fare: 150
    },
    {
      id: 3,
      name: 'Howrah Tarakeswar Local 303',
      start: 'Howrah',
      destination: 'Tarakeswar',
      departure: '10:00 AM',
      arrival: '02:00 PM',
      seatsAvailable: 100,
      fare: 80
    },
    {
      id: 4,
      name: 'Sealdah Habra Local 304',
      start: 'Sealdah',
      destination: 'Habra',
      departure: '4:00 PM',
      arrival: '6:15 PM',
      seatsAvailable: 100,
      fare: 90
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredTrains = dummyTrains.filter(
      (train) =>
        train.start.toLowerCase() === startStation.toLowerCase() &&
        train.destination.toLowerCase() === destinationStation.toLowerCase()
    );
    setTrains(filteredTrains);
    setSelectedTrain(null);
  };

  const handleBookNow = (train) => {
    if (!user) {
      alert('Please login to book tickets');
      return;
    }
    setSelectedTrain(train);
  };

  const handleConfirmBooking = () => {
    alert(`Booking confirmed for ${selectedTrain.name} by ${user.username}`);
    // In a real app, you would send this to your backend
    setSelectedTrain(null);
    setTrains([]);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{fontWeight:'bold',color:'#0836B1' }}>
        Search Trains
      </h2>
      <span className="train-emoji">🚂</span>
      
      <form onSubmit={handleSearch} className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="startStation" className="form-label bold-label">
              Starting Station
            </label>
            <input
              type="text"
              className="form-control"
              id="startStation"
              value={startStation}
              onChange={(e) => setStartStation(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="destinationStation" className="form-label bold-label">
              Destination Station
            </label>
            <input
              type="text"
              className="form-control"
              id="destinationStation"
              value={destinationStation}
              onChange={(e) => setDestinationStation(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="date" className="form-label bold-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="col-md-1 d-flex align-items-end">
            <button type="submit" className="btn btn-success w-100">
              Search
            </button>
          </div>
        </div>
      </form>

      {user && (
        <div className="alert alert-info mb-4">
          Logged in as: <strong>{user.username}</strong>
        </div>
      )}

      {trains.length > 0 ? (
        <div className="mt-4">
          <h3 className="mb-3">Available Trains</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Train Name</th>
                <th>Start</th>
                <th>Destination</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Seats</th>
                <th>Fare (₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trains.map((train) => (
                <tr key={train.id}>
                  <td>{train.name}</td>
                  <td>{train.start}</td>
                  <td>{train.destination}</td>
                  <td>{train.departure}</td>
                  <td>{train.arrival}</td>
                  <td>{train.seatsAvailable}</td>
                  <td>{train.fare}</td>
                  <td>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleBookNow(train)}
                    >
                      Book Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No trains found. Please adjust your search criteria.</p>
      )}

      {/* Booking Modal */}
      {selectedTrain && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Booking</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setSelectedTrain(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Train: <strong>{selectedTrain.name}</strong></p>
                <p>From: {selectedTrain.start} to {selectedTrain.destination}</p>
                <p>Departure: {selectedTrain.departure}</p>
                <p>Arrival: {selectedTrain.arrival}</p>
                <p>Fare: ₹{selectedTrain.fare}</p>
                <p>Passenger: {user.username}</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setSelectedTrain(null)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleConfirmBooking}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowTrains;