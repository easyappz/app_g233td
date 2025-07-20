import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '../api/axios.js';
import { Box, Typography, Container, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, TextField, Button, CircularProgress } from '@mui/material';
import MessageItem from '../components/MessageItem';

const fetchDialogs = async (userId) => {
  const response = await instance.get(`/api/dialogs/${userId}`);
  return response.data;
};

const fetchMessages = async (dialogId) => {
  const response = await instance.get(`/api/messages/${dialogId}`);
  return response.data;
};

const markMessagesAsRead = async (dialogId) => {
  await instance.post(`/api/messages/${dialogId}/read`);
};

const sendMessage = async ({ senderId, targetUserId, content }) => {
  const response = await instance.post(`/api/messages/${senderId}/${targetUserId}`, { content });
  return response.data;
};

const fetchCurrentUser = async () => {
  const response = await instance.get('/api/user/me');
  return response.data;
};

function DialogsPage() {
  const [selectedDialog, setSelectedDialog] = useState(null);
  const [messageText, setMessageText] = useState('');
  const queryClient = useQueryClient();

  const { data: userData, isLoading: loadingUser, isError: userError } = useQuery(
    ['currentUser'],
    fetchCurrentUser,
    { staleTime: 5 * 60 * 1000 }
  );

  const userId = userData?.userId || null;

  const { data: dialogs, isLoading: loadingDialogs, isError: dialogsError } = useQuery(
    ['dialogs', userId],
    () => fetchDialogs(userId),
    { enabled: !!userId, staleTime: 60000 }
  );

  const { data: messages, isLoading: loadingMessages, isError: messagesError } = useQuery(
    ['messages', selectedDialog?._id],
    () => fetchMessages(selectedDialog._id),
    { enabled: !!selectedDialog, staleTime: 30000 }
  );

  const markReadMutation = useMutation(
    (dialogId) => markMessagesAsRead(dialogId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['dialogs', userId]);
      },
    }
  );

  const sendMessageMutation = useMutation(
    ({ senderId, targetUserId, content }) => sendMessage({ senderId, targetUserId, content }),
    {
      onSuccess: (newMessage) => {
        queryClient.invalidateQueries(['messages', selectedDialog?._id]);
        queryClient.invalidateQueries(['dialogs', userId]);
        setMessageText('');
      },
    }
  );

  useEffect(() => {
    if (selectedDialog) {
      markReadMutation.mutate(selectedDialog._id);
    }
  }, [selectedDialog]);

  const handleDialogSelect = (dialog) => {
    setSelectedDialog(dialog);
  };

  const handleSendMessage = () => {
    if (messageText.trim() === '' || !selectedDialog) return;
    const targetUserId = selectedDialog.participants.find(p => p._id !== userId)._id;
    sendMessageMutation.mutate({ senderId: userId, targetUserId, content: messageText });
  };

  const getDialogName = (dialog) => {
    const otherParticipant = dialog.participants.find(p => p._id !== userId);
    return otherParticipant ? otherParticipant.name || otherParticipant.username : 'Неизвестный пользователь';
  };

  const getDialogAvatar = (dialog) => {
    const otherParticipant = dialog.participants.find(p => p._id !== userId);
    return otherParticipant ? otherParticipant.avatar || '' : '';
  };

  if (loadingUser || (userId && loadingDialogs)) {
    return (
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (userError || dialogsError) {
    return (
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Typography color="error">Ошибка загрузки данных. Попробуйте позже.</Typography>
      </Container>
    );
  }

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
              {dialogs && dialogs.length > 0 ? (
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
                ) : messages && messages.length > 0 ? (
                  messages.map((message) => (
                    <MessageItem
                      key={message._id}
                      message={message}
                      isSentByUser={message.sender._id === userId}
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
                  disabled={messageText.trim() === '' || sendMessageMutation.isLoading}
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
