import React from 'react';

function FavoritesList({ favorites, handleRemoveFromFavorites }) {
  // Function to remove an item from favorites
  const removeItem = (id) => {
    handleRemoveFromFavorites(id);
  };

  return (
    <div className="favorites">
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favItem) => (
          <li key={favItem.trackId}>
            {favItem.trackName}
            <button onClick={() => removeItem(favItem.trackId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesList;
