const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if all required fields are provided
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Check if user already exists with the provided email or username
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token for the new user
    const token = generateToken(user._id, user.username);

    // Return the user data and token
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar || '',
        bio: user.bio || '',
        followers: user.followers || [],
        following: user.following || [],
        createdAt: user.createdAt
      },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token for the user
    const token = generateToken(user._id, user.username);

    // Return the user data and token
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar || '',
        bio: user.bio || '',
        followers: user.followers || [],
        following: user.following || [],
        createdAt: user.createdAt
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
