import React, { useState } from 'react';
import BASE_URL from '../../utils/config';

function AddAircraft() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/aircraft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        setMessage('Aircraft added successfully!');
        setName('');
      } else {
        setMessage('Error adding aircraft.');
      }
    } catch {
      setMessage('Error adding aircraft.');
    }
  };

  return (
    <div>
      <h1>Add Aircraft</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Aircraft Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddAircraft;
