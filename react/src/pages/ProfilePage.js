import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Avatar, TextField, Button, Grid } from '@mui/material';

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Пользователь',
    bio: 'Расскажите о себе...',
    avatar: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar sx={{ width: 150, height: 150, mb: 2, mx: 'auto' }} src={profileData.avatar} />
            {isEditing ? (
              <TextField
                fullWidth
                margin="normal"
                label="URL аватара"
                name="avatar"
                value={profileData.avatar}
                onChange={handleChange}
              />
            ) : null}
          </Grid>
          <Grid item xs={12} md={8}>
            {isEditing ? (
              <Box component="form" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Имя"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="О себе"
                  name="bio"
                  multiline
                  rows={4}
                  value={profileData.bio}
                  onChange={handleChange}
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Сохранить
                  </Button>
                  <Button variant="outlined" onClick={() => setIsEditing(false)}>
                    Отмена
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography variant="h5" gutterBottom>
                  {profileData.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {profileData.bio}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                  Редактировать профиль
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Мои посты
        </Typography>
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography>Здесь будут отображаться ваши посты.</Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default ProfilePage;
