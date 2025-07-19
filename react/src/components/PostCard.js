import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, Typography, IconButton, Box } from '@mui/material';
import { Favorite, Comment, Share } from '@mui/icons-material';

function PostCard({ post }) {
  return (
    <Card sx={{ mb: 2, bgcolor: 'white' }}>
      <CardHeader
        avatar={<Avatar src={post.authorAvatar} />}
        title={post.authorName}
        subheader={new Date(post.createdAt).toLocaleString('ru-RU')}
      />
      <CardContent>
        <Typography variant="body1">{post.content}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
          <IconButton aria-label="Нравится">
            <Favorite />
          </IconButton>
          <IconButton aria-label="Комментировать">
            <Comment />
          </IconButton>
          <IconButton aria-label="Поделиться">
            <Share />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}

export default PostCard;
