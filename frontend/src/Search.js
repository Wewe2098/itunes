// Search.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoritesList from './FavoritesList';

function Search() {
  // Define state variables for search and favorites
  const [searchTerm, setSearchTerm] = useState(''); // To store the search term
  const [store, setStore] = useState('itunes'); // To store the selected store
  const [searchResults, setSearchResults] = useState([]); // To store search results
  const [favorites, setFavorites] = useState([]); // To store favorite items

  // Function to handle searching
  const handleSearch = async () => {
    try {
      // Make an API request to fetch search results based on the search term and store
      const response = await axios.get(`/search?term=${searchTerm}&store=${store}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to add an item to the favorites
  const handleAddToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };

  // Function to remove an item from the favorites
  const handleRemoveFromFavorites = (id) => {
  // Filter out the item to be removed from the favorites list
  const updatedFavorites = favorites.filter((favItem) => favItem.trackId !== id);
  setFavorites(updatedFavorites);
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
        {/* Display search results and provide an "Add to Favorites" button */}
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
      <FavoritesList favorites={favItem} handleRemoveFromFavorites={handleRemoveFromFavorites} />
    </div>
  );
}

export default Search;
