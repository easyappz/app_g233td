import { instance } from './axios';
import { handleApiError } from '../utils/errorHandler';

/**
 * Fetch feed posts
 * @param {number} page - Page number
 * @param {number} limit - Number of posts per page
 * @returns {Promise<Object[]>} List of posts
 */
export const getFeedPosts = async (page = 1, limit = 10) => {
  try {
    const response = await instance.get(`/posts/feed/${page}?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении ленты новостей:', error);
    return handleApiError(error, 'Не удалось загрузить ленту новостей. Попробуйте снова.');
  }
};

/**
 * Create a new post
 * @param {string} content - Post content
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Created post
 */
export const createNewPost = async (content, userId) => {
  try {
    const response = await instance.post(`/posts/${userId}`, { content });
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании поста:', error);
    return handleApiError(error, 'Не удалось создать пост. Попробуйте снова.');
  }
};

/**
 * Like a post
 * @param {string} postId - Post ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Response
 */
export const likePostById = async (postId, userId) => {
  try {
    const response = await instance.post(`/posts/${postId}/like/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при лайке поста:', error);
    return handleApiError(error, 'Не удалось поставить лайк. Попробуйте снова.');
  }
};

/**
 * Comment on a post
 * @param {string} postId - Post ID
 * @param {string} content - Comment content
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Response
 */
export const commentOnPost = async (postId, content, userId) => {
  try {
    const response = await instance.post(`/posts/${postId}/comment/${userId}`, { content });
    return response.data;
  } catch (error) {
    console.error('Ошибка при комментировании поста:', error);
    return handleApiError(error, 'Не удалось оставить комментарий. Попробуйте снова.');
  }
};
