import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import FavoritesList from './components/FavoritesList';

import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('music');
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  // Function to handle search requests
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          searchTerm
        )}&media=${mediaType}&limit=15`
      );      
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setSearchResults(data.results || []);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error searching iTunes:', error);
      setError('Failed to fetch search results. Please check your internet connection and try again.');
    }
  };

  // Function to handle removal of items from favorites
  const handleRemoveFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((item) => item.trackId !== id);
    setFavorites(updatedFavorites);
  };

  // Function to add items to favorites
  const addToFavorites = (item) => {
    const updatedFavorites = [...favorites, item];
    setFavorites(updatedFavorites);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>iTunes Store Search</h1>
        {/* Render SearchForm component */}
        <SearchForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          mediaType={mediaType}
          setMediaType={setMediaType}
          handleSearch={handleSearch}
        />
      </header>
      <div className="content">
        {/* Display error message if there's an error */}
        {error && <p className="error-message">{error}</p>}
        <div className="search-results">
          {/* Display search results */}
          {searchResults.map((result) => (
            <div key={result.trackId} className="search-result">
              <p>{result.trackName} - {result.artistName}</p>
              <button onClick={() => addToFavorites(result)}>Add to Favorites</button>
            </div>
          ))}
        </div>
        {/* Render FavoritesList component */}
        <FavoritesList favorites={favorites} handleRemoveFromFavorites={handleRemoveFromFavorites} />
      </div>
    </div>
  );
}

export default App;
