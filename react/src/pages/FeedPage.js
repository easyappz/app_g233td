import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import { ThumbUp, Comment, Send } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

const fetchPosts = async (page) => {
  const response = await instance.get(`/api/posts/feed?page=${page}&limit=10`);
  return response.data;
};

const createPost = async (content) => {
  const response = await instance.post('/api/posts', { content });
  return response.data;
};

const likePost = async (postId) => {
  const response = await instance.post(`/api/posts/${postId}/like`);
  return response.data;
};

const addComment = async ({ postId, content }) => {
  const response = await instance.post(`/api/posts/${postId}/comment`, { content });
  return response.data;
};

const FeedPage = () => {
  const [page, setPage] = useState(1);
  const [newPost, setNewPost] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery(
    ['posts', page],
    () => fetchPosts(page),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const createPostMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setNewPost('');
    },
    onError: (err) => {
      console.error('Error creating post:', err);
    },
  });

  const likePostMutation = useMutation(likePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
    onError: (err) => {
      console.error('Error liking post:', err);
    },
  });

  const commentMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setCommentInputs({});
    },
    onError: (err) => {
      console.error('Error adding comment:', err);
    },
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      createPostMutation.mutate(newPost);
    }
  };

  const handleLike = (postId) => {
    likePostMutation.mutate(postId);
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    const content = commentInputs[postId]?.trim();
    if (content) {
      commentMutation.mutate({ postId, content });
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Ошибка загрузки ленты: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Лента новостей
      </Typography>

      {/* Create Post Section */}
      <Card sx={{ mb: 3, boxShadow: 3 }}>
        <CardContent>
          <form onSubmit={handlePostSubmit}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Что у вас нового?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={createPostMutation.isLoading || !newPost.trim()}
              fullWidth
            >
              Опубликовать
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Posts List */}
      {data?.posts?.length > 0 ? (
        data.posts.map((post) => (
          <Card key={post._id} sx={{ mb: 3, boxShadow: 2 }}>
            <CardHeader
              avatar={<Avatar src={post.author.avatar} />}
              title={post.author.name}
              subheader={formatDistanceToNow(new Date(post.createdAt), { locale: ru, addSuffix: true })}
            />
            <CardContent>
              <Typography variant="body1">{post.content}</Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                onClick={() => handleLike(post._id)}
                color={post.isLiked ? 'primary' : 'default'}
              >
                <ThumbUp />
                <Typography sx={{ ml: 1 }}>{post.likesCount}</Typography>
              </IconButton>
              <IconButton>
                <Comment />
                <Typography sx={{ ml: 1 }}>{post.commentsCount}</Typography>
              </IconButton>
            </CardActions>

            {/* Comments Section */}
            {post.comments && post.comments.length > 0 && (
              <>
                <Divider />
                <List>
                  {post.comments.map((comment) => (
                    <ListItem key={comment._id} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src={comment.author.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.author.name}
                        secondary={comment.content}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            {/* Add Comment */}
            <Divider />
            <Box sx={{ p: 2 }}>
              <form onSubmit={(e) => handleCommentSubmit(e, post._id)}>
                <TextField
                  fullWidth
                  placeholder="Написать комментарий..."
                  value={commentInputs[post._id] || ''}
                  onChange={(e) => handleCommentChange(post._id, e.target.value)}
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <IconButton type="submit" disabled={!commentInputs[post._id]?.trim()}>
                        <Send />
                      </IconButton>
                    ),
                  }}
                />
              </form>
            </Box>
          </Card>
        ))
      ) : (
        <Typography textAlign="center">Постов пока нет.</Typography>
      )}

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          variant="outlined"
          sx={{ mr: 1 }}
        >
          Предыдущая
        </Button>
        <Button
          onClick={() => setPage((old) => old + 1)}
          disabled={!data?.hasMore}
          variant="outlined"
        >
          Следующая
        </Button>
      </Box>
    </Box>
  );
};

export default FeedPage;
