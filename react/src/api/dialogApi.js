import { instance } from './axios.js';

/**
 * Fetch user dialogs
 * @param {string} userId - User ID
 * @returns {Promise<Object[]>} List of dialogs
 */
export const getDialogs = async (userId) => {
  const response = await instance.get(`/api/dialogs/${userId}`);
  return response.data;
};

/**
 * Fetch messages for a specific dialog
 * @param {string} dialogId - Dialog ID
 * @returns {Promise<Object[]>} List of messages
 */
export const getMessages = async (dialogId) => {
  const response = await instance.get(`/api/messages/${dialogId}`);
  return response.data;
};

/**
 * Send a message to a user
 * @param {string} userId - Sender user ID
 * @param {string} targetUserId - Receiver user ID
 * @param {Object} data - Message data
 * @param {string} data.content - Message content
 * @returns {Promise<Object>} Sent message
 */
export const sendMessage = async (userId, targetUserId, data) => {
  const response = await instance.post(`/api/messages/${userId}/${targetUserId}`, data);
  return response.data;
};

/**
 * Mark messages as read in a dialog
 * @param {string} dialogId - Dialog ID
 * @returns {Promise<Object>} Response
 */
export const markMessagesAsRead = async (dialogId) => {
  const response = await instance.post(`/api/messages/${dialogId}/read`);
  return response.data;
};
