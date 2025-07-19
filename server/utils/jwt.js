const jwt = require('jsonwebtoken');

// Secret key for JWT signing (hardcoded for this example as per instructions)
const JWT_SECRET = 'my-secret-key-for-jwt-social-network';

// Generate JWT token for a user
exports.generateToken = (userId, username) => {
  return jwt.sign(
    { userId, username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Verify JWT token
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
