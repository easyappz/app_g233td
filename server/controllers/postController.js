const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const newPost = new Post({
      userId,
      content,
    });

    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ error: 'Failed to create post' });
  }
};

// Get posts by user
exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({ error: 'Invalid pagination parameters' });
    }

    const posts = await Post.find({ userId })
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .populate('userId', 'username')
      .populate('likes', 'username')
      .populate('comments.userId', 'username');

    const totalPosts = await Post.countDocuments({ userId });

    return res.status(200).json({
      posts,
      total: totalPosts,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(totalPosts / limitNumber),
    });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get feed (posts from followed users or all posts)
exports.getFeed = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({ error: 'Invalid pagination parameters' });
    }

    // For simplicity, returning all posts as feed (can be modified to filter by followed users)
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .populate('userId', 'username')
      .populate('likes', 'username')
      .populate('comments.userId', 'username');

    const totalPosts = await Post.countDocuments();

    return res.status(200).json({
      posts,
      total: totalPosts,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(totalPosts / limitNumber),
    });
  } catch (error) {
    console.error('Error fetching feed:', error);
    return res.status(500).json({ error: 'Failed to fetch feed' });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: 'Post already liked' });
    }

    post.likes.push(userId);
    await post.save();

    return res.status(200).json({ message: 'Post liked successfully', likes: post.likes });
  } catch (error) {
    console.error('Error liking post:', error);
    return res.status(500).json({ error: 'Failed to like post' });
  }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const index = post.likes.indexOf(userId);
    if (index === -1) {
      return res.status(400).json({ error: 'Post not liked yet' });
    }

    post.likes.splice(index, 1);
    await post.save();

    return res.status(200).json({ message: 'Post unliked successfully', likes: post.likes });
  } catch (error) {
    console.error('Error unliking post:', error);
    return res.status(500).json({ error: 'Failed to unlike post' });
  }
};

// Comment on a post
exports.commentOnPost = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Comment content is required' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({
      userId,
      content,
    });
    await post.save();

    return res.status(200).json({ message: 'Comment added successfully', comments: post.comments });
  } catch (error) {
    console.error('Error commenting on post:', error);
    return res.status(500).json({ error: 'Failed to comment on post' });
  }
};

// Edit a post
exports.editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user owns the post (this assumes req.user is set by protect middleware)
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to edit this post' });
    }

    post.content = content;
    await post.save();

    return res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    console.error('Error editing post:', error);
    return res.status(500).json({ error: 'Failed to edit post' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user owns the post (this assumes req.user is set by protect middleware)
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to delete this post' });
    }

    await Post.deleteOne({ _id: postId });

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ error: 'Failed to delete post' });
  }
};
