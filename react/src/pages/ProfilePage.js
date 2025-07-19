import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Avatar,
  Container,
  Paper,
  Grid,
  Divider,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import { instance } from '../api/axios';

const fetchProfile = async (userId) => {
  const response = await instance.get(`/profiles/${userId}`);
  return response.data;
};

const updateProfile = async (userId, data) => {
  const response = await instance.put(`/profiles/${userId}`, data);
  return response.data;
};

const uploadAvatar = async (userId, file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  const response = await instance.post(`/profiles/${userId}/avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

const ProfilePage = () => {
  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);

  const { data, isLoading, isError, error, refetch } = useQuery(
    ['profile', userId],
    () => fetchProfile(userId),
    { staleTime: 60000 }
  );

  const updateProfileMutation = useMutation(
    (data) => updateProfile(userId, data),
    {
      onSuccess: () => {
        setIsEditing(false);
        refetch();
      },
    }
  );

  const uploadAvatarMutation = useMutation(
    (file) => uploadAvatar(userId, file),
    {
      onSuccess: () => {
        setAvatarFile(null);
        refetch();
      },
    }
  );

  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, [data]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    updateProfileMutation.mutate(profileData);
    if (avatarFile) {
      uploadAvatarMutation.mutate(avatarFile);
    }
  };

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography color="error">Ошибка: {error.message}</Typography>
        <Button onClick={refetch} variant="contained" sx={{ mt: 2 }}>
          Попробовать снова
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              src={profileData.avatarUrl || ''}
              alt={profileData.name || 'Профиль'}
              sx={{ width: 150, height: 150, margin: '0 auto', mb: 2 }}
            />
            {isEditing && (
              <>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mb: 2 }}
                >
                  Загрузить аватар
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleAvatarChange}
                  />
                </Button>
                {avatarFile && (
                  <Typography variant="caption" display="block" gutterBottom>
                    Выбран файл: {avatarFile.name}
                  </Typography>
                )}
              </>
            )}
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h4" gutterBottom>
                {profileData.name || 'Имя не указано'}
              </Typography>
              <IconButton onClick={handleEditToggle} sx={{ alignSelf: 'flex-start' }}>
                {isEditing ? <SaveIcon onClick={handleSave} /> : <EditIcon />}
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {isEditing ? (
              <Box component="form" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Имя"
                  name="name"
                  value={profileData.name || ''}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="О себе"
                  name="bio"
                  multiline
                  rows={4}
                  value={profileData.bio || ''}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Город"
                  name="city"
                  value={profileData.city || ''}
                  onChange={handleInputChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  sx={{ mt: 2 }}
                >
                  Сохранить
                </Button>
              </Box>
            ) : (
              <>
                <Typography variant="body1" paragraph>
                  <strong>О себе:</strong> {profileData.bio || 'Не указано'}
                </Typography>
                <Typography variant="body1">
                  <strong>Город:</strong> {profileData.city || 'Не указано'}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
