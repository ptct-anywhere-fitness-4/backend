require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { TOKEN_SECRET } = require('../secrets/secret');
const Instructors = require('../instructors/instructors-model');
const Clients = require('../clients/clients-model');
const { verifyBody, uniqueUsername, verifyRole } = require('./auth-middleware');
const buildToken = require('../utils/buildToken');

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

router.post('/login', verifyBody, (req, res, next) => {
  const { username, password } = req.body;

  Clients.getClientBy({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = buildToken(user);

        res.status(200).json({
          message: `Welcome to the website ${user.username}`,
          token,
        });
      } else {
        next({ status: 401, message: 'invalid username or password' });
      }
    })
    .catch((err) => {
      next(err);
    });

  Instructors.getInstructorBy({ username })
    .then((user) => {
      if (username && bcrypt.compareSync(password, user.password)) {
        const token = buildToken(user);

        res.status(200).json({
          message: `Welcome to the website instructor ${user.username}`,
          token,
        });
      } else {
        next({ status: 401, message: 'invalid username or password' });
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
