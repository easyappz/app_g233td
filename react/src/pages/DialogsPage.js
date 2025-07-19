import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, TextField, Button, CircularProgress } from '@mui/material';
import MessageItem from '../components/MessageItem';
import { instance } from '../api/axios.js';

function DialogsPage() {
  const [dialogs, setDialogs] = useState([]);
  const [selectedDialog, setSelectedDialog] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loadingDialogs, setLoadingDialogs] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await instance.get('/api/user/me');
        setCurrentUserId(response.data.userId);
        fetchDialogs(response.data.userId);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const fetchDialogs = async (userId) => {
    try {
      setLoadingDialogs(true);
      const response = await instance.get(`/api/dialogs/${userId}`);
      setDialogs(response.data);
    } catch (error) {
      console.error('Error fetching dialogs:', error);
    } finally {
      setLoadingDialogs(false);
    }
  };

  const fetchMessages = async (dialogId) => {
    try {
      setLoadingMessages(true);
      const response = await instance.get(`/api/messages/${dialogId}`);
      setMessages(response.data);
      // Mark messages as read
      await instance.post(`/api/messages/${dialogId}/read`);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (selectedDialog) {
      fetchMessages(selectedDialog._id);
    }
  }, [selectedDialog]);

  const handleDialogSelect = (dialog) => {
    setSelectedDialog(dialog);
  };

  const handleSendMessage = async () => {
    if (messageText.trim() === '' || !selectedDialog) return;

    try {
      const targetUserId = selectedDialog.participants.find(p => p._id !== currentUserId)._id;
      const response = await instance.post(`/api/messages/${currentUserId}/${targetUserId}`, { content: messageText });
      setMessages([...messages, response.data]);
      setMessageText('');
      // Refresh dialogs to update last message
      fetchDialogs(currentUserId);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getDialogName = (dialog) => {
    const otherParticipant = dialog.participants.find(p => p._id !== currentUserId);
    return otherParticipant ? otherParticipant.name || otherParticipant.username : 'Неизвестный пользователь';
  };

  const getDialogAvatar = (dialog) => {
    const otherParticipant = dialog.participants.find(p => p._id !== currentUserId);
    return otherParticipant ? otherParticipant.avatar || '' : '';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', gap: 3, height: 'calc(100vh - 100px)' }}>
        <Paper elevation={3} sx={{ width: '30%', p: 2, overflowY: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            Диалоги
          </Typography>
          {loadingDialogs ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {dialogs.length > 0 ? (
                dialogs.map((dialog) => (
                  <ListItem
                    key={dialog._id}
                    selected={selectedDialog?._id === dialog._id}
                    onClick={() => handleDialogSelect(dialog)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <ListItemAvatar>
                      <Avatar src={getDialogAvatar(dialog)} />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={getDialogName(dialog)} 
                      secondary={dialog.lastMessage ? dialog.lastMessage.content : 'Нет сообщений'} 
                    />
                  </ListItem>
                ))
              ) : (
                <Typography color="text.secondary" sx={{ p: 2 }}>
                  У вас нет диалогов.
                </Typography>
              )}
            </List>
          )}
        </Paper>

        <Paper elevation={3} sx={{ width: '70%', p: 2, display: 'flex', flexDirection: 'column' }}>
          {selectedDialog ? (
            <>
              <Typography variant="h6" gutterBottom>
                Чат с {getDialogName(selectedDialog)}
              </Typography>
              <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                {loadingMessages ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                  </Box>
                ) : messages.length > 0 ? (
                  messages.map((message) => (
                    <MessageItem
                      key={message._id}
                      message={message}
                      isSentByUser={message.sender._id === currentUserId}
                    />
                  ))
                ) : (
                  <Typography color="text.secondary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    Нет сообщений в этом диалоге.
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Введите сообщение"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSendMessage}
                  disabled={messageText.trim() === ''}
                >
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
