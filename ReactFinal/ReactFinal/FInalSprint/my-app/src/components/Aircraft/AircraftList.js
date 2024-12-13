import React, { useState, useEffect } from 'react';
import BASE_URL from '../../utils/config';

function AircraftList() {
  const [aircrafts, setAircrafts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${BASE_URL}/aircraft`)
      .then((res) => res.json())
      .then((data) => setAircrafts(data))
      .catch(() => setError('Error fetching aircraft data.'));
  }, []);

  const deleteAircraft = async (id) => {
    if (window.confirm('Are you sure you want to delete this aircraft?')) {
      try {
        await fetch(`${BASE_URL}/aircraft/${id}`, { method: 'DELETE' });
        setAircrafts(aircrafts.filter((aircraft) => aircraft.id !== id));
      } catch {
        setError('Error deleting aircraft.');
      }
    }
  };

  return (
    <div>
      <h1>Aircraft List</h1>
      {error && <p>{error}</p>}
      <ul>
        {aircrafts.map((aircraft) => (
          <li key={aircraft.id}>
            {aircraft.name} <button onClick={() => deleteAircraft(aircraft.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AircraftList;
