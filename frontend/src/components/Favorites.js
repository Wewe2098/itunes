// frontend/src/FavoritesList.js
import React from 'react';

function FavoritesList({ favorites }) {
  return (
    <div className="favorites">
      <h2>Favorites</h2>
      <ul>
        {favorites.map((item, index) => (
          <li key={item.trackId}>
            {item.trackName} - {item.artistName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesList;
