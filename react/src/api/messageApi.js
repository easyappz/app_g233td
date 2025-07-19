import { instance } from './axios';
import { handleApiError } from '../utils/errorHandler';

/**
 * Send a message to start a dialog with another user
 * @param {string} senderId - The ID of the sender
 * @param {string} targetUserId - The ID of the target user
 * @param {string} content - The content of the message
 * @returns {Promise<Object>} - The response from the server
 */
export const startDialog = async (senderId, targetUserId, content) => {
  try {
    const response = await instance.post(`/messages/${senderId}/to/${targetUserId}`, { content });
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    return handleApiError(error, 'Не удалось отправить сообщение. Попробуйте снова.');
  }
};

/**
 * Fetch dialogs for a user
 * @param {string} userId - The ID of the user
 * @returns {Promise<Array>} - Array of dialogs
 */
export const getDialogs = async (userId) => {
  try {
    const response = await instance.get(`/dialogs/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении диалогов:', error);
    return handleApiError(error, 'Не удалось загрузить диалоги. Попробуйте снова.');
  }
};

/**
 * Fetch messages for a specific dialog
 * @param {string} dialogId - The ID of the dialog
 * @returns {Promise<Array>} - Array of messages
 */
export const getMessages = async (dialogId) => {
  try {
    const response = await instance.get(`/messages/${dialogId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении сообщений:', error);
    return handleApiError(error, 'Не удалось загрузить сообщения. Попробуйте снова.');
  }
};

/**
 * Mark messages as read in a dialog
 * @param {string} dialogId - The ID of the dialog
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} - The response from the server
 */
export const markMessagesAsRead = async (dialogId, userId) => {
  try {
    const response = await instance.post(`/messages/${dialogId}/read/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при отметке сообщений как прочитанных:', error);
    return handleApiError(error, 'Не удалось отметить сообщения как прочитанные.');
  }
};
