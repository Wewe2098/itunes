import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoritesList from './FavoritesList';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [store, setStore] = useState('itunes');
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleRemoveFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((favItem) => favItem.trackId !== id);
    setFavorites(updatedFavorites);
  };
  

  // Define the handleSearch function for searching
  const handleSearch = async () => {
    try {
      // Make an API request to fetch search results
      const response = await axios.get(`/search?term=${searchTerm}&store=${store}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Define the handleAddToFavorites function for adding items to favorites
  const handleAddToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };

  // Load favorites from local storage on page load
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <div>
        {/* Search input and options */}
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={store} onChange={(e) => setStore(e.target.value)}>
          <option value="itunes">iTunes Store</option>
          <option value="appleBooks">Apple Books Store</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {/* Display search results */}
        {searchResults.map((result) => (
          <li key={result.trackId}>
            {result.trackName}
            <button onClick={() => handleAddToFavorites(result)}>Add to Favorites</button>
          </li>
        ))}
      </ul>
      <h2>Favorites</h2>
      <ul>
        {/* Display favorites and provide a "Remove" button */}
        {favorites.map((favItem) => (
          <li key={favItem.trackId}>
            {favItem.trackName}
            <button onClick={() => handleRemoveFromFavorites(favItem.trackId)}>Remove</button>
          </li>
        ))}
      </ul>
      <FavoritesList favorites={favorites} handleRemoveFromFavorites={handleRemoveFromFavorites} />
    </div>
  );
}

export default Search;
