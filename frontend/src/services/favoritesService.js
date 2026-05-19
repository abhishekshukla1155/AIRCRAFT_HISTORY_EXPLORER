import axiosInstance from '../api/axios';

const favoritesService = {
  // Get all favorited aircraft for current user
  getFavorites: async () => {
    const response = await axiosInstance.get('/favorites/');
    return response.data;
  },

  // Add an aircraft to user's favorites
  addFavorite: async (aircraftId) => {
    const response = await axiosInstance.post('/favorites/', { aircraft_id: aircraftId });
    return response.data;
  },

  // Remove an aircraft from user's favorites
  removeFavorite: async (favoriteId) => {
    const response = await axiosInstance.delete(`/favorites/${favoriteId}/`);
    return response.data;
  }
};

export default favoritesService;
