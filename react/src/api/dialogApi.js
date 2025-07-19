import { instance } from './axios';
import { handleApiError } from '../utils/errorHandler';

/**
 * Fetch user dialogs
 * @param {string} userId - User ID
 * @returns {Promise<Object[]>} List of dialogs
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
 * @param {string} dialogId - Dialog ID
 * @returns {Promise<Object[]>} List of messages
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
 * Send a message to a user
 * @param {string} userId - Sender user ID
 * @param {string} targetUserId - Receiver user ID
 * @param {Object} data - Message data
 * @param {string} data.content - Message content
 * @returns {Promise<Object>} Sent message
 */
export const sendMessage = async (userId, targetUserId, data) => {
  try {
    const response = await instance.post(`/messages/${userId}/to/${targetUserId}`, data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    return handleApiError(error, 'Не удалось отправить сообщение. Попробуйте снова.');
  }
};

/**
 * Mark messages as read in a dialog
 * @param {string} dialogId - Dialog ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Response
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
