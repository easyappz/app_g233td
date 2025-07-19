const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const { content, images } = req.body;

    const newPost = new Post({
      userId,
      content,
      images: images || [],
    });

    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Get posts by user
exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId })
      .populate('userId', 'username fullName profilePicture')
      .populate('likes', 'username')
      .populate('comments.userId', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get feed (posts from followed users)
exports.getFeed = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const followingIds = user.following;
    const posts = await Post.find({ userId: { $in: followingIds } })
      .populate('userId', 'username fullName profilePicture')
      .populate('likes', 'username')
      .populate('comments.userId', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching feed:', error);
    res.status(500).json({ error: 'Failed to fetch feed' });
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

    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Failed to like post' });
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

    post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    await post.save();

    res.status(200).json({ message: 'Post unliked successfully' });
  } catch (error) {
    console.error('Error unliking post:', error);
    res.status(500).json({ error: 'Failed to unlike post' });
  }
};

// Comment on a post
exports.commentOnPost = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const { content } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({ userId, content });
    await post.save();

    res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error commenting on post:', error);
    res.status(500).json({ error: 'Failed to comment on post' });
  }
};
