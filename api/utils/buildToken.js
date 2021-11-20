const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../secrets/secret');

module.exports = (user) => {
  const payload = {
    isInstructor: user.isInstructor,
    username: user.username,
  };

  const options = {
    expiresIn: '15m',
  };

  return jwt.sign(payload, TOKEN_SECRET, options);
};
