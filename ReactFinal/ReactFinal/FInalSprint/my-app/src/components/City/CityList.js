import React, { useState, useEffect } from 'react';
import BASE_URL from '../../utils/config';

function CityList() {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${BASE_URL}/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch(() => setError('Error fetching city data.'));
  }, []);

  const deleteCity = async (id) => {
    if (window.confirm('Are you sure you want to delete this city?')) {
      try {
        await fetch(`${BASE_URL}/cities/${id}`, { method: 'DELETE' });
        setCities(cities.filter((city) => city.id !== id));
      } catch {
        setError('Error deleting city.');
      }
    }
  };

  return (
    <div>
      <h1>City List</h1>
      {error && <p>{error}</p>}
      <ul>
        {cities.map((city) => (
          <li key={city.id}>
            {city.name} <button onClick={() => deleteCity(city.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CityList;
