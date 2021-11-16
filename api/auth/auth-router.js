require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { TOKEN_SECRET } = require('../secrets/secret');
const Instructors = require('../instructors/instructors-model');
const Clients = require('../clients/clients-model');
const { verifyBody, uniqueUsername } = require('./auth-middleware');

module.exports = router;
router.post('/register', verifyBody, uniqueUsername, (req, res, next) => {
  const user = req.body; // {username: blah, password: blah, instructorPassword: afroman}
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;
  const { username, password, instructorPassword } = user;

  if (instructorPassword === process.env.INSTRUCTOR_PASSWORD) {
    Instructors.createInstructor({ username, password })
      .then((saved) => {
        res
          .status(201)
          .json({ message: `Great to have you, ${saved.username}` });
      })
      .catch((err) => next(err));
  } else {
    Clients.createClient({ username, password })
      .then((saved) => {
        res
          .status(201)
          .json({ message: `Great to have you, ${saved.username}` });
      })
      .catch((err) => next(err));
  }
});
