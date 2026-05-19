import axiosInstance from '../api/axios';

const aircraftService = {
  // Get paginated list of aircraft with search/filter queries
  getAircraftList: async (params = {}) => {
    const response = await axiosInstance.get('/aircraft/', { params });
    return response.data;
  },

  // Get specific aircraft details along with historical timeline
  getAircraftDetails: async (id) => {
    const response = await axiosInstance.get(`/aircraft/${id}/`);
    return response.data;
  },

  // Compare multiple aircraft side-by-side
  compareAircraft: async (ids) => {
    // Expects query parameter like ?ids=1,2,3
    const response = await axiosInstance.get('/compare/', {
      params: { ids: ids.join(',') }
    });
    return response.data;
  }
};

export default aircraftService;
