import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainList = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/trains')
      .then(response => setTrains(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Trains</h1>
      <ul>
        {trains.map(train => (
          <li key={train._id}>
            {train.name} - {train.source} to {train.destination} (Seats: {train.seatsAvailable}, Fare: ${train.fare})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;