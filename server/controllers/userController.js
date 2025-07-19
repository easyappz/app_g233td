const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;
    
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      select: '-password',
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Follow a user
exports.followUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'Follow functionality not implemented yet' });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'Unfollow functionality not implemented yet' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Search users by name or username with pagination
exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.q || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Using a case-insensitive search for name or username
    const searchCriteria = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { username: { $regex: query, $options: 'i' } },
      ],
    };

    const totalUsers = await User.countDocuments(searchCriteria);
    const users = await User.find(searchCriteria)
      .select('-password')
      .skip(skip)
      .limit(limit);

    res.json({
      total: totalUsers,
      page,
      limit,
      totalPages: Math.ceil(totalUsers / limit),
      users,
    });
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
