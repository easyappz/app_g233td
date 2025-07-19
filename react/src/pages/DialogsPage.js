import React, { useState } from 'react';
import { Box, Typography, Container, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, TextField, Button } from '@mui/material';
import MessageItem from '../components/MessageItem';

function DialogsPage() {
  const [selectedDialog, setSelectedDialog] = useState(null);
  const [messageText, setMessageText] = useState('');

  const mockDialogs = [
    { id: 1, name: 'Пользователь 1', avatar: '', lastMessage: 'Привет!' },
    { id: 2, name: 'Пользователь 2', avatar: '', lastMessage: 'Как дела?' },
  ];

  const mockMessages = [
    { id: 1, senderAvatar: '', text: 'Привет!', createdAt: new Date().toISOString(), senderId: 1 },
    { id: 2, senderAvatar: '', text: 'Привет, как дела?', createdAt: new Date().toISOString(), senderId: 0 },
  ];

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    setMessageText('');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', gap: 3, height: 'calc(100vh - 100px)' }}>
        <Paper elevation={3} sx={{ width: '30%', p: 2, overflowY: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            Диалоги
          </Typography>
          <List>
            {mockDialogs.map((dialog) => (
              <ListItem
                key={dialog.id}
                selected={selectedDialog?.id === dialog.id}
                onClick={() => setSelectedDialog(dialog)}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemAvatar>
                  <Avatar src={dialog.avatar} />
                </ListItemAvatar>
                <ListItemText primary={dialog.name} secondary={dialog.lastMessage} />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper elevation={3} sx={{ width: '70%', p: 2, display: 'flex', flexDirection: 'column' }}>
          {selectedDialog ? (
            <>
              <Typography variant="h6" gutterBottom>
                Чат с {selectedDialog.name}
              </Typography>
              <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                {mockMessages.map((message) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    isSentByUser={message.senderId === 0}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Введите сообщение"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage}>
                  Отправить
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">
                Выберите диалог, чтобы начать общение.
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default DialogsPage;
