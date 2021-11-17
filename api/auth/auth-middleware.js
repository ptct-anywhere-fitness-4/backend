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

  const [clientMaybe] = await Client.getClientBy({ username });
  const [instructorMaybe] = await Instructor.getInstructorBy({ username });

  if (!clientMaybe && !instructorMaybe) {
    next();
  } else {
    next({ status: 403, message: 'user already exists' });
  }
};

const verifyRole = async (req, res, next) => {
  const { username } = req.body;
  const [clientMaybe] = await Client.getClientBy({ username });
  const [instructorMaybe] = await Instructor.getInstructorBy({ username });

  if (!clientMaybe && !instructorMaybe) {
    next({ status: 404, message: 'incorrect username or password' });
  } else {
    if (clientMaybe) {
      req.isInstructor = false;
      req.user = clientMaybe;
      next();
    } else {
      req.isInstructor = true;
      req.user = instructorMaybe;
      next();
    }
  }
};

module.exports = {
  verifyBody,
  uniqueUsername,
  verifyRole,
};
