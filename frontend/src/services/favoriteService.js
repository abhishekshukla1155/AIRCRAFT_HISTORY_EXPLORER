import api from '../api/api';

/**
 * Fetch the authenticated user's favorite aircrafts.
 */
export const getFavorites = async () => {
  const response = await api.get('/favorites/');
  return response.data;
};

/**
 * Add an aircraft to favorites.
 * FavoriteSerializer expects 'aircraft' to be the aircraft ID.
 */
export const addFavorite = async (aircraftId) => {
  const response = await api.post('/favorites/', { aircraft: aircraftId });
  return response.data;
};

/**
 * Remove an aircraft from favorites using the favorite instance ID.
 */
export const removeFavorite = async (favoriteId) => {
  const response = await api.delete(`/favorites/${favoriteId}/`);
  return response.data;
};
