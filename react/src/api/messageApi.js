import { instance } from './axios';

/**
 * Send a message to start a dialog with another user
 * @param {string} senderId - The ID of the sender
 * @param {string} targetUserId - The ID of the target user
 * @param {string} content - The content of the message
 * @returns {Promise<Object>} - The response from the server
 */
export const startDialog = async (senderId, targetUserId, content) => {
  const response = await instance.post(`/api/messages/send/${senderId}/${targetUserId}`, { content });
  return response.data;
};

/**
 * Fetch dialogs for a user
 * @param {string} userId - The ID of the user
 * @returns {Promise<Array>} - Array of dialogs
 */
export const getDialogs = async (userId) => {
  const response = await instance.get(`/api/messages/dialogs/${userId}`);
  return response.data;
};

/**
 * Fetch messages for a specific dialog
 * @param {string} dialogId - The ID of the dialog
 * @returns {Promise<Array>} - Array of messages
 */
export const getMessages = async (dialogId) => {
  const response = await instance.get(`/api/messages/${dialogId}`);
  return response.data;
};

/**
 * Mark messages as read in a dialog
 * @param {string} dialogId - The ID of the dialog
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} - The response from the server
 */
export const markMessagesAsRead = async (dialogId, userId) => {
  const response = await instance.post(`/api/messages/read/${dialogId}/${userId}`);
  return response.data;
};
