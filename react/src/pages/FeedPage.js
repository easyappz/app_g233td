import React from 'react';
import { Box, Typography, Container, Paper, TextField, Button } from '@mui/material';
import PostCard from '../components/PostCard';

function FeedPage() {
  const mockPosts = [
    {
      id: 1,
      authorName: 'Пользователь 1',
      authorAvatar: '',
      content: 'Привет, это мой первый пост!',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      authorName: 'Пользователь 2',
      authorAvatar: '',
      content: 'Как прекрасен этот мир, посмотри!',
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Создать пост
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Что у вас нового?"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary">
          Опубликовать
        </Button>
      </Paper>

      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Лента новостей
      </Typography>
      {mockPosts.length > 0 ? (
        mockPosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography>Нет постов для отображения.</Typography>
        </Paper>
      )}
    </Container>
  );
}

export default FeedPage;
