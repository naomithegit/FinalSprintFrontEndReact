import React, { useState } from 'react';
import BASE_URL from '../../utils/config';

function AddPassenger() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/passengers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        setMessage('Passenger added successfully!');
        setName('');
      } else {
        setMessage('Error adding passenger.');
      }
    } catch {
      setMessage('Error adding passenger.');
    }
  };

  return (
    <div>
      <h1>Add Passenger</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Passenger Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddPassenger;
