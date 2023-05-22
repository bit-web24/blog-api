const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers['authorization'];

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Missing token.' });
  }

  try {
    // Verify and decode the token
    const secretKey = process.env.SECRET_KEY;
    const decodedToken = jwt.verify(token, secretKey);

    // Attach the user information to the request object
    req.user = decodedToken;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = { authenticateToken };
