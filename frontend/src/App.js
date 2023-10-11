// App.js
import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import FavoritesList from './components/Favorites';
import './App.css';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('music,audiobook,video,movie');
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          searchTerm
        )}&media=${mediaType}&limit=15`
      );      
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error searching iTunes:', error);
    }
  };

  const addToFavorites = (item) => {
    const updatedFavorites = [...favorites, item];
    setFavorites(updatedFavorites);
  };

  return (
    <div className="App">
      <h1>iTunes Store Search</h1>
      <SearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        mediaType={mediaType}
        setMediaType={setMediaType}
        handleSearch={handleSearch}
      />
      <div className="search-results">
        {searchResults.map((result) => (
          <div key={result.trackId}>
            {result.trackName} - {result.artistName}
            <button onClick={() => addToFavorites(result)}>Add to Favorites</button>
          </div>
        ))}
      </div>
      <FavoritesList favorites={favorites} />
    </div>
  );
}

export default App;
