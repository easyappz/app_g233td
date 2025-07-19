const UserProfile = require('../models/UserProfile');

// Get user profile data
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await UserProfile.findOne({ userId });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

// Update user profile information
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, avatar, description } = req.body;
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (description !== undefined) updateData.description = description;
    
    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true }
    );
    
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await UserProfile.findOneAndDelete({ userId });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Server error while deleting profile' });
  }
};
