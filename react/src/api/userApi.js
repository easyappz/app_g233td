import { instance } from './axios';

/**
 * Fetch user data by ID
 * @param {string} userId - The ID of the user to fetch
 * @returns {Promise<Object>} - The user data
 */
export const getUserById = async (userId) => {
  const response = await instance.get(`/api/users/${userId}`);
  return response.data;
};

/**
 * Fetch posts of a specific user
 * @param {string} userId - The ID of the user whose posts to fetch
 * @returns {Promise<Array>} - Array of posts
 */
export const getUserPosts = async (userId) => {
  const response = await instance.get(`/api/posts/user/${userId}`);
  return response.data;
};
