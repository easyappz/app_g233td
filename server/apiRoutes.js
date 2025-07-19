const express = require('express');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const messageController = require('./controllers/messageController');
const profileController = require('./controllers/profileController');
const { protect } = require('./middleware/authMiddleware');

const router = express.Router();

// Authentication Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// User Routes
router.get('/users/:userId', protect, userController.getProfile);
router.put('/users/:userId', protect, userController.updateProfile);
router.post('/users/:userId/follow/:targetUserId', protect, userController.followUser);
router.post('/users/:userId/unfollow/:targetUserId', protect, userController.unfollowUser);
router.get('/users/search', protect, userController.searchUsers);

// Profile Routes
router.get('/profiles/:userId', protect, profileController.getProfile);
router.put('/profiles/:userId', protect, profileController.updateProfile);
router.delete('/profiles/:userId', protect, profileController.deleteProfile);
router.post('/profiles/:userId/avatar', protect, profileController.uploadAvatar);

// Post Routes
router.post('/posts/:userId', protect, postController.createPost);
router.get('/posts/user/:userId', protect, postController.getUserPosts);
router.get('/posts/feed/:userId', protect, postController.getFeed);
router.post('/posts/:postId/like/:userId', protect, postController.likePost);
router.post('/posts/:postId/unlike/:userId', protect, postController.unlikePost);
router.post('/posts/:postId/comment/:userId', protect, postController.commentOnPost);
router.put('/posts/:postId', protect, postController.editPost);
router.delete('/posts/:postId', protect, postController.deletePost);

// Message Routes
router.get('/dialogs/:userId', protect, messageController.getDialogs);
router.get('/messages/:dialogId', protect, messageController.getMessages);
router.post('/messages/:userId/to/:targetUserId', protect, messageController.sendMessage);
router.post('/messages/:dialogId/read/:userId', protect, messageController.markMessagesAsRead);

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
