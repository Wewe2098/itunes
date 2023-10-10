import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [store, setStore] = useState('itunes');
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search?term=${searchTerm}&store=${store}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };

  const handleRemoveFromFavorites = (item) => {
    const updatedFavorites = favorites.filter((favItem) => favItem.trackId !== item.trackId);
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    // Save the favorites list in local storage for persistence
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    // Load favorites from local storage on page load
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <div>
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
        {searchResults.map((result) => (
          <li key={result.trackId}>
            {result.trackName}
            <button onClick={() => handleAddToFavorites(result)}>Add to Favorites</button>
          </li>
        ))}
      </ul>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favItem) => (
          <li key={favItem.trackId}>
            {favItem.trackName}
            <button onClick={() => handleRemoveFromFavorites(favItem)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
