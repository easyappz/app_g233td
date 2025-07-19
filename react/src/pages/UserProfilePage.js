import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Paper, Avatar, Button, Grid } from '@mui/material';

function UserProfilePage() {
  const { id } = useParams();

  const userData = {
    id,
    name: `Пользователь ${id}`,
    bio: 'Информация о пользователе...',
    avatar: '',
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar sx={{ width: 150, height: 150, mb: 2, mx: 'auto' }} src={userData.avatar} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography variant="h5" gutterBottom>
                {userData.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {userData.bio}
              </Typography>
              <Button variant="contained" color="primary">
                Написать сообщение
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Посты пользователя
        </Typography>
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography>Здесь будут отображаться посты пользователя.</Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default UserProfilePage;
