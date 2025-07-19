const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Ошибка при получении профиля:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, bio, city } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, bio, city },
      { new: true, select: '-password' }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    res.status(200).json({ message: 'Профиль удален' });
  } catch (error) {
    console.error('Ошибка при удалении профиля:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Upload avatar (placeholder for future implementation)
exports.uploadAvatar = async (req, res) => {
  try {
    // This is a placeholder. Actual file upload logic will depend on storage solution.
    const userId = req.params.userId;
    res.status(200).json({ message: 'Аватар загружен (заглушка)', avatarUrl: '/placeholder-avatar.jpg' });
  } catch (error) {
    console.error('Ошибка при загрузке аватара:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
