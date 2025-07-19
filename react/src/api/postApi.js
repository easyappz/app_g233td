import { instance } from './axios';

export const getFeedPosts = async (page = 1, limit = 10) => {
  const response = await instance.get(`/api/posts/feed?page=${page}&limit=${limit}`);
  return response.data;
};

export const createNewPost = async (content) => {
  const response = await instance.post('/api/posts', { content });
  return response.data;
};

export const likePostById = async (postId) => {
  const response = await instance.post(`/api/posts/${postId}/like`);
  return response.data;
};

export const commentOnPost = async (postId, content) => {
  const response = await instance.post(`/api/posts/${postId}/comment`, { content });
  return response.data;
};
