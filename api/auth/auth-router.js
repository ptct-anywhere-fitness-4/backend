const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Instructors = require('../instructors/instructors-model');
const Clients = require('../clients/clients-model');
const { verifyBody, uniqueUsername, verifyRole } = require('./auth-middleware');
const buildToken = require('../utils/buildToken');

router.post('/register', verifyBody, uniqueUsername, (req, res, next) => {
  const user = req.body; // {username: blah, password: blah, instructorPassword: afroman}
  const rounds = 8;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;
  const { username, password, instructorPassword } = user;

  if (instructorPassword === process.env.INSTRUCTOR_PASSWORD) {
    Instructors.createInstructor({ username, password })
      .then((saved) => {
        res
          .status(201)
          .json({ message: `Great to have you, instructor ${saved.username}` });
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

router.post('/login', verifyBody, verifyRole, (req, res, next) => {
  const { password } = req.body;
  const token = buildToken(req.user);

  if (bcrypt.compareSync(password, req.user.password)) {
    res.status(200).json({
      token,
      username: req.user.username,
      isInstructor: req.user.isInstructor,
      id: req.user.id,
    });
  } else {
    next({ status: 401, message: 'invalid username or password' });
  }
});

module.exports = router;
