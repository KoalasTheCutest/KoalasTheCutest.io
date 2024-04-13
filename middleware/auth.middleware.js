const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Get the token from the request headers
  const token = req.headers.authorization;
  console.log("🚀 ~ authMiddleware ~ token:", token)

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_secret_key');
    console.log("🚀 ~ authMiddleware ~ decoded:", decoded)

    // Attach the decoded token to the request object
    req.userId = decoded.userId;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
