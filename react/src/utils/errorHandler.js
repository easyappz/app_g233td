import { toast } from 'react-toastify';

/**
 * Centralized error handler for API requests
 * @param {Error} error - The error object from the API request
 * @param {string} defaultMessage - Default error message to display if none provided by server
 */
export const handleApiError = (error, defaultMessage) => {
  const errorMessage = error.message || defaultMessage;
  toast.error(errorMessage, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  throw error;
};
