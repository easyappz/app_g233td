import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

function MessageItem({ message, isSentByUser }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isSentByUser ? 'row-reverse' : 'row',
        mb: 2,
        alignItems: 'flex-end',
      }}
    >
      <Avatar src={message.senderAvatar} sx={{ width: 32, height: 32, mr: isSentByUser ? 0 : 2, ml: isSentByUser ? 2 : 0 }} />
      <Box
        sx={{
          maxWidth: '70%',
          bgcolor: isSentByUser ? 'primary.main' : 'background.paper',
          color: isSentByUser ? 'white' : 'text.primary',
          p: 1.5,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="body2">{message.text}</Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.8 }}>
          {new Date(message.createdAt).toLocaleTimeString('ru-RU')}
        </Typography>
      </Box>
    </Box>
  );
}

export default MessageItem;
