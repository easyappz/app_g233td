import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Theme, useTheme } from '@mui/material/styles';

/**
 * Wrapper component for ToastContainer to centralize toast notifications
 * Styled to match the Facebook-inspired Material-UI theme
 */
const ToastContainerWrapper = () => {
  const theme: Theme = useTheme();

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      toastStyle={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        fontFamily: theme.typography.fontFamily,
      }}
      progressStyle={{
        backgroundColor: theme.palette.primary.main,
      }}
    />
  );
};

export default ToastContainerWrapper;
