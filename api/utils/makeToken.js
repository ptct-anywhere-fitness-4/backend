const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../secrets/secret');

const makeToken = (user) => {
  const payload = {
    isInstructor: user.isInstructor,
    username: user.username,
  };

  const options = {
    expiresIn: '90s',
  };

  return jwt.sign(payload, TOKEN_SECRET, options);
};
