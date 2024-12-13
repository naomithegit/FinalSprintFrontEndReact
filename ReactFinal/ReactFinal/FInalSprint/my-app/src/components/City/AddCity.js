import React, { useState } from 'react';
import BASE_URL from '../../utils/config';

function AddCity() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        setMessage('City added successfully!');
        setName('');
      } else {
        setMessage('Error adding city.');
      }
    } catch {
      setMessage('Error adding city.');
    }
  };

  return (
    <div>
      <h1>Add City</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddCity;
