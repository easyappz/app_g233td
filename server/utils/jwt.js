const jwt = require('jsonwebtoken');

// Secret key for JWT signing (hardcoded as per instructions since .env is not used)
const JWT_SECRET = 'my-secret-key-for-jwt-social-network';

// Generate JWT token for a user
exports.generateToken = (userId, username) => {
  try {
    return jwt.sign(
      { userId, username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Token generation failed');
  }
};

// Verify JWT token
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};
