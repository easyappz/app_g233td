import React from 'react';
import { Card, CardContent, Avatar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function UserCard({ user }) {
  return (
    <Card sx={{ mb: 2, bgcolor: 'white', textAlign: 'center' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar src={user.avatar} sx={{ width: 80, height: 80 }} />
          <Typography variant="h6">{user.name}</Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/user/${user.id}`}
          >
            Посмотреть профиль
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserCard;
