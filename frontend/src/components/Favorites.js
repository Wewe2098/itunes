import React from 'react';

function FavoritesList({ favorites, handleRemoveFromFavorites }) {
  return (
    <div className="favorites">
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favItem) => (
          <li key={favItem.trackId}>
            {favItem.trackName}
            <button onClick={() => handleRemoveFromFavorites(favItem.trackId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesList;
