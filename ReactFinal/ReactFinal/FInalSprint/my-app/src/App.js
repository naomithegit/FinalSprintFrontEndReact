import React, { useState } from 'react';
import BASE_URL from './utils/config';
import './index.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(null); 
  const [formData, setFormData] = useState({});
  const [searchType, setSearchType] = useState('passengers'); 

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search term.');
      setResults([]);
      return;
    }

    try {
      setError('');
      setResults([]);

      
      const response = await fetch(`${BASE_URL}/${searchType}/search?q=${query}`);
      const data = await response.json();

      if (data.length > 0) {
        setResults(data);
      } else {
        setError('No matching results found.');
      }
    } catch (err) {
      setError('An error occurred while searching.');
      console.error(err);
    }
  };

  const handleAdd = async () => {
    try {
      const endpointMap = {
        aircraft: '/aircraft',
        airport: '/airports',
        city: '/cities',
        passenger: '/passengers',
      };

      const response = await fetch(`${BASE_URL}${endpointMap[showModal]}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`${showModal} added successfully!`);
        setShowModal(null);
        setFormData({});
      } else {
        alert(`Failed to add ${showModal}.`);
      }
    } catch (err) {
      console.error('Error adding entity:', err);
    }
  };

  const renderFormFields = () => {
    switch (showModal) {
      case 'aircraft':
        return (
          <>
            <input
              type="text"
              placeholder="Type"
              value={formData.type || ''}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            />
            <input
              type="text"
              placeholder="Airline Name"
              value={formData.airLineName || ''}
              onChange={(e) => setFormData({ ...formData, airLineName: e.target.value })}
            />
            <input
              type="number"
              placeholder="Number of Passengers"
              value={formData.numberOfPassengers || ''}
              onChange={(e) => setFormData({ ...formData, numberOfPassengers: parseInt(e.target.value, 10) })}
            />
          </>
        );
      case 'airport':
        return (
          <>
            <input
              type="text"
              placeholder="Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Airport Code"
              value={formData.airportCode || ''}
              onChange={(e) => setFormData({ ...formData, airportCode: e.target.value })}
            />
          </>
        );
      case 'city':
        return (
          <>
            <input
              type="text"
              placeholder="Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="State"
              value={formData.state || ''}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
            <input
              type="number"
              placeholder="Population"
              value={formData.population || ''}
              onChange={(e) => setFormData({ ...formData, population: parseInt(e.target.value, 10) })}
            />
          </>
        );
      case 'passenger':
        return (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName || ''}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName || ''}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phoneNumber || ''}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="outer-box">
      <div className="inner-box">
        <div className="logo">
          <h1>Naomi & Chels Air</h1>
          <p>Your Gateway to Seamless Air Travel</p>
        </div>

        <nav className="navbar">
          <h3><a href="#" target="_blank">Home</a></h3>
          <h3><a href="#" target="_blank">Bookings</a></h3>
          <h3><a href="#" target="_blank">Airport</a></h3>
          <h3><a href="#" target="_blank">About Us</a></h3>
          <h3><a href="#" target="_blank">Contact</a></h3>
        </nav>

        <div className="welcome">
          <h1>Welcome, let's find your booking!</h1>
          <p>Your one-stop solution for managing air travel data!</p>
        </div>

        <div className="search-section">
          <div className="search-bar">
            <div className="input-container">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="dropdown-container">
              <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="search-dropdown">
                <option value="passengers">Passengers</option>
                <option value="aircraft">Aircraft</option>
                <option value="airports">Airports</option>
                <option value="cities">Cities</option>
              </select>
            </div>
            
            <div className="button-container">
              <button onClick={handleSearch} className="search-button">Search</button>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
          {results.length > 0 && (
            <div className="search-results">
              <h2>Search Results</h2>
              <ul>
                {results.map((item, index) => (
                  <li key={index}>
                    <strong>{item.firstName || item.name}</strong> – {JSON.stringify(item)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="add-buttons">
          <button onClick={() => setShowModal('aircraft')}>Add an Aircraft</button>
          <button onClick={() => setShowModal('airport')}>Add an Airport</button>
          <button onClick={() => setShowModal('city')}>Add a City</button>
          <button onClick={() => setShowModal('passenger')}>Add a Passenger</button>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add {showModal}</h2>
              <form>{renderFormFields()}</form>
              <button onClick={handleAdd}>Submit</button>
              <button onClick={() => setShowModal(null)}>Close</button>
            </div>
          </div>
        )}

        <footer className="footer">
          <p>&copy; 2024 Naomi & Chels Air. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
