// restricted (was already made)
//need these:
//check if instructor created class (before update/deletion)
//check for schedule conflict (if instructor create or user sign up twice in same time slot)

//check if user exists and is a client
//check if user exists and is an instructor
//check if newly created user should be a client or an instructor
//check instructor createclass payload
//more...?
const Client = require('../clients/clients-model');
const Instructor = require('../instructors/instructors-model');

const verifyBody = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({ status: 400, message: 'username or password are missing' });
  } else {
    next();
  }
};

const uniqueUsername = async (req, res, next) => {
  const { username } = req.body;

  const clientMaybe = await Client.getClientBy({ username });
  const instructorMaybe = await Instructor.getInstructorBy({ username });

  if (!clientMaybe.length && !instructorMaybe.length) {
    next();
  } else {
    next({ status: 403, message: 'user already exists' });
  }
};

const verifyRole = async (req, res, next) => {
  const { username } = req.body;
  const clientMaybe = await Client.getClientBy({ username });
  const instructorMaybe = await Instructor.getInstructorBy({ username });

  if (!clientMaybe.length && !instructorMaybe.length) {
    next({ status: 404, message: 'incorrect username or password' });
  } else {
    if (clientMaybe.length) {
      req.isInstructor = false;
      next();
    } else {
      req.isInstructor = true;
      next();
    }
  }
};

module.exports = {
  verifyBody,
  uniqueUsername,
  verifyRole,
};
