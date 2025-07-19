const express = require('express');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const messageController = require('./controllers/messageController');

const router = express.Router();

// Authentication Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// User Routes
router.get('/users/:userId', userController.getProfile);
router.put('/users/:userId', userController.updateProfile);
router.post('/users/:userId/follow/:targetUserId', userController.followUser);
router.post('/users/:userId/unfollow/:targetUserId', userController.unfollowUser);
router.get('/users/search', userController.searchUsers);

// Post Routes
router.post('/posts/:userId', postController.createPost);
router.get('/posts/user/:userId', postController.getUserPosts);
router.get('/posts/feed/:userId', postController.getFeed);
router.post('/posts/:postId/like/:userId', postController.likePost);
router.post('/posts/:postId/unlike/:userId', postController.unlikePost);
router.post('/posts/:postId/comment/:userId', postController.commentOnPost);

// Message Routes
router.get('/dialogs/:userId', messageController.getDialogs);
router.get('/messages/:dialogId', messageController.getMessages);
router.post('/messages/:userId/to/:targetUserId', messageController.sendMessage);
router.post('/messages/:dialogId/read/:userId', messageController.markMessagesAsRead);

// Health Check Routes
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
