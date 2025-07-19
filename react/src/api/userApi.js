import { instance } from './axios';

/**
 * Fetch current user data
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User data
 */
export const getCurrentUser = async (userId) => {
  try {
    const response = await instance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    throw new Error(error.response?.data?.message || 'Не удалось загрузить данные пользователя. Попробуйте снова.');
  }
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} data - Profile data to update
 * @returns {Promise<Object>} Updated user data
 */
export const updateProfile = async (userId, data) => {
  try {
    const response = await instance.put(`/users/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    throw new Error(error.response?.data?.message || 'Не удалось обновить профиль. Попробуйте снова.');
  }
};

/**
 * Follow a user
 * @param {string} userId - User ID
 * @param {string} targetUserId - Target User ID to follow
 * @returns {Promise<Object>} Response
 */
export const followUser = async (userId, targetUserId) => {
  try {
    const response = await instance.post(`/users/${userId}/follow/${targetUserId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при подписке на пользователя:', error);
    throw new Error(error.response?.data?.message || 'Не удалось подписаться на пользователя. Попробуйте снова.');
  }
};

/**
 * Unfollow a user
 * @param {string} userId - User ID
 * @param {string} targetUserId - Target User ID to unfollow
 * @returns {Promise<Object>} Response
 */
export const unfollowUser = async (userId, targetUserId) => {
  try {
    const response = await instance.post(`/users/${userId}/unfollow/${targetUserId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при отписке от пользователя:', error);
    throw new Error(error.response?.data?.message || 'Не удалось отписаться от пользователя. Попробуйте снова.');
  }
};

/**
 * Search users
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @param {number} limit - Results per page
 * @returns {Promise<Object>} Search results
 */
export const searchUsers = async (query, page = 1, limit = 10) => {
  try {
    const response = await instance.get(`/users/search?q=${query}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при поиске пользователей:', error);
    throw new Error(error.response?.data?.message || 'Не удалось выполнить поиск пользователей. Попробуйте снова.');
  }
};
