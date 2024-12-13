import React, { useState, useEffect } from 'react';
import BASE_URL from '../../utils/config';

function AirportList() {
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${BASE_URL}/airports`)
      .then((res) => res.json())
      .then((data) => setAirports(data))
      .catch(() => setError('Error fetching airport data.'));
  }, []);

  const deleteAirport = async (id) => {
    if (window.confirm('Are you sure you want to delete this airport?')) {
      try {
        await fetch(`${BASE_URL}/airports/${id}`, { method: 'DELETE' });
        setAirports(airports.filter((airport) => airport.id !== id));
      } catch {
        setError('Error deleting airport.');
      }
    }
  };

  return (
    <div>
      <h1>Airport List</h1>
      {error && <p>{error}</p>}
      <ul>
        {airports.map((airport) => (
          <li key={airport.id}>
            {airport.name} <button onClick={() => deleteAirport(airport.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AirportList;
