import React, { useState } from 'react';
import BASE_URL from '../../utils/config';

function AddAirport() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/airports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        setMessage('Airport added successfully!');
        setName('');
      } else {
        setMessage('Error adding airport.');
      }
    } catch {
      setMessage('Error adding airport.');
    }
  };

  return (
    <div>
      <h1>Add Airport</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Airport Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddAirport;
