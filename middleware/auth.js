// Autentikasi User, buat bisa next ke data lainnya
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // verify token
  try {
    let decoded;
    if(process.env.NODE_ENV === 'production'){
      decoded = jwt.verify(token, process.env.jwtSecret);
    } else {
      decoded = jwt.verify(token, config.get('jwtSecret'));
    }
    // const decoded = jwt.verify(token, process.env.jwtSecret)

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
