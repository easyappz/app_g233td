import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../api/axios';
import {
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Pagination,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const fetchUsers = async (query, page) => {
  const response = await instance.get(`/api/users/search?q=${encodeURIComponent(query)}&page=${page}&limit=10`);
  return response.data;
};

const SearchUsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const pageParam = parseInt(searchParams.get('page')) || 1;

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [inputValue, setInputValue] = useState(queryParam);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['searchUsers', queryParam, pageParam],
    queryFn: () => fetchUsers(queryParam, pageParam),
    keepPreviousData: true,
    staleTime: 5000,
  });

  const handleSearch = () => {
    setSearchParams({ q: inputValue, page: '1' });
    setSearchQuery(inputValue);
  };

  const handlePageChange = (event, value) => {
    setSearchParams({ q: queryParam, page: value.toString() });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    setInputValue(queryParam);
    setSearchQuery(queryParam);
  }, [queryParam]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Поиск пользователей
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Введите имя или логин"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            sx={{ height: '56px' }}
          >
            Поиск
          </Button>
        </Box>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Typography color="error" sx={{ mt: 2 }}>
          Ошибка при загрузке данных: {error.message}
        </Typography>
      )}

      {!isLoading && !isError && data && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Найдено пользователей: {data.total || 0}
          </Typography>
          <Grid container spacing={3}>
            {data.users && data.users.length > 0 ? (
              data.users.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user._id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={user.avatar || 'https://via.placeholder.com/150'}
                      alt={`${user.name} avatar`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        @{user.username}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" color="text.secondary">
                  По вашему запросу ничего не найдено.
                </Typography>
              </Grid>
            )}
          </Grid>

          {data.totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={data.totalPages || 1}
                page={pageParam}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchUsersPage;
