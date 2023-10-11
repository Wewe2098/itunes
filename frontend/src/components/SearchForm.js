// frontend/src/SearchForm.js
import React from 'react';

function SearchForm({
  searchTerm,
  setSearchTerm,
  mediaType,
  setMediaType,
  handleSearch,
}) {
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={mediaType}
        onChange={(e) => setMediaType(e.target.value)}
      >
        <option value="music">Music</option>
        <option value="musicVideo">Music Videos</option>
        <option value="movie">Movies</option>
        <option value="audiobook">Audiobooks</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
