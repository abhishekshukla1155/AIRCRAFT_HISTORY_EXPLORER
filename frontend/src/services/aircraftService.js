import api from '../api/api';

/**
 * Fetch list of aircrafts from the backend.
 * Supports filtering/search parameters passed via params.
 */
export const getAircraftList = async (params = {}) => {
  const response = await api.get('/aircraft/', { params });
  return response.data;
};

/**
 * Fetch detailed information for a single aircraft.
 */
export const getAircraftDetail = async (id) => {
  const response = await api.get(`/aircraft/${id}/`);
  return response.data;
};

/**
 * Fetch historical eras for filtering.
 */
export const getEras = async () => {
  const response = await api.get('/aircraft/eras/');
  return response.data;
};
