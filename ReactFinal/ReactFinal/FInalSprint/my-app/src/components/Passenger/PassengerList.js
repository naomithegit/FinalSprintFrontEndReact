import React, { useState, useEffect } from 'react';
import BASE_URL from '../../utils/config';

function PassengerList() {
  const [passengers, setPassengers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${BASE_URL}/passengers`)
      .then((res) => res.json())
      .then((data) => setPassengers(data))
      .catch(() => setError('Error fetching passenger data.'));
  }, []);

  const deletePassenger = async (id) => {
    if (window.confirm('Are you sure you want to delete this passenger?')) {
      try {
        await fetch(`${BASE_URL}/passengers/${id}`, { method: 'DELETE' });
        setPassengers(passengers.filter((passenger) => passenger.id !== id));
      } catch {
        setError('Error deleting passenger.');
      }
    }
  };

  return (
    <div>
      <h1>Passenger List</h1>
      {error && <p>{error}</p>}
      <ul>
        {passengers.map((passenger) => (
          <li key={passenger.id}>
            {passenger.name} <button onClick={() => deletePassenger(passenger.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PassengerList;
