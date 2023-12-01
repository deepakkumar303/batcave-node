const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function for JWT authentication
const authenticateWebJWT = (req, res, next) => {
  const token = req.header('Authorization');
  console.log('token-----------------', token)

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_WEB_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateWebJWT;
