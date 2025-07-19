import React, { useState } from 'react';
import { Box, Typography, Container, Paper, TextField, Button } from '@mui/material';
import UserCard from '../components/UserCard';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const mockResults = [
      { id: 1, name: 'Пользователь 1', avatar: '' },
      { id: 2, name: 'Пользователь 2', avatar: '' },
    ];
    setSearchResults(mockResults);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Поиск пользователей
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            placeholder="Введите имя пользователя"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Найти
          </Button>
        </Box>
      </Paper>

      {searchResults.length > 0 ? (
        <>
          <Typography variant="h6" gutterBottom>
            Результаты поиска
          </Typography>
          {searchResults.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      ) : (
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography>Введите запрос для поиска пользователей.</Typography>
        </Paper>
      )}
    </Container>
  );
}

export default SearchPage;
