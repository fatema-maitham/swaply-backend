const jwt = require('jsonwebtoken');

const isSignedIn = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).json({
        err: 'Login Required',
      });
    }

    const parts = bearerToken.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        err: 'Invalid authorization format',
      });
    }

    const token = parts[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (err) {
    console.log('AUTH ERROR:', err.message);

    return res.status(401).json({
      err: 'Login Required',
    });
  }
};

module.exports = isSignedIn;