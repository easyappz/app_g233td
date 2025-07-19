import { instance } from './axios.js';

/**
 * Fetch current user data
 * @returns {Promise<Object>} User data
 */
export const getCurrentUser = async () => {
  const response = await instance.get('/api/user/me');
  return response.data;
};
