import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Paper, Avatar, Button, Grid, CircularProgress, Divider } from '@mui/material';
import { Message as MessageIcon } from '@mui/icons-material';
import PostCard from '../components/PostCard';
import { instance } from '../api/axios';

function UserProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userResponse = await instance.get(`/api/users/${id}`);
        setUserData(userResponse.data);

        const postsResponse = await instance.get(`/api/posts/user/${id}`);
        setPosts(postsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить данные пользователя');
        setLoading(false);
        console.error(err);
      }
    };

    fetchUserData();
  }, [id]);

  const handleMessageClick = async () => {
    try {
      const currentUserId = localStorage.getItem('userId');
      if (!currentUserId) {
        navigate('/login');
        return;
      }
      await instance.post(`/api/messages/send/${currentUserId}/${id}`, { content: 'Привет!' });
      navigate('/dialogs');
    } catch (err) {
      console.error('Ошибка при отправке сообщения:', err);
      setError('Не удалось начать диалог');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography>Загрузка...</Typography>
      </Container>
    );
  }

  if (error || !userData) {
    return (
      <Container maxWidth="md" sx={{ mt: 3, textAlign: 'center' }}>
        <Typography color="error">{error || 'Пользователь не найден'}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: '#fff', borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar sx={{ width: 150, height: 150, mb: 2, mx: 'auto', border: '2px solid #fff', boxShadow: 1 }} src={userData.avatar || ''} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1d1d1d' }}>
                {userData.name || 'Без имени'}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {userData.bio || 'Информация о пользователе не указана'}
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<MessageIcon />}
                onClick={handleMessageClick}
                sx={{ mt: 2, textTransform: 'none', fontSize: '1rem', backgroundColor: '#1877F2', '&:hover': { backgroundColor: '#166FE5' } }}
              >
                Написать сообщение
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
          Посты пользователя
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post._id} post={post} sx={{ mb: 2 }} />
          ))
        ) : (
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', backgroundColor: '#fff', borderRadius: 2 }}>
            <Typography>У пользователя пока нет постов.</Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default UserProfilePage;
