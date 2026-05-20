import React, { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from '../services/favoriteService';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error("Failed to fetch favorites", error);
    }
    setLoading(false);
  };

  const handleRemove = async (id) => {
    try {
      await removeFavorite(id);
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch (error) {
      console.error("Failed to remove favorite", error);
    }
  };

  return (
    <div className="page favorites-page">
      <h2>My Favorite Aircrafts</h2>
      {loading ? (
        <p>Loading favorites...</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((fav) => (
            <div key={fav.id} className="favorite-item">
              <div>
                <h3>{fav.aircraft_name}</h3>
                <p>{fav.manufacturer} - {fav.country} ({fav.generation})</p>
              </div>
              <button onClick={() => handleRemove(fav.id)} className="btn-remove">Remove</button>
            </div>
          ))}
          {favorites.length === 0 && <p>You haven't favorited any aircraft yet.</p>}
        </div>
      )}
    </div>
  );
}
