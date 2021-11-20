const Instructor = require('./instructors-model');

const validClass = (req, res, next) => {
  const {
    name,
    type,
    date,
    start_time,
    duration,
    registered_clients,
    max_clients,
    instructor_id,
    intensity_id,
    location_id,
  } = req.body;
  // res.json(req.body.type);

  if (
    !name ||
    !type ||
    !date ||
    !start_time ||
    !duration ||
    !registered_clients ||
    !max_clients ||
    !instructor_id ||
    !intensity_id ||
    !location_id
  ) {
    next({ status: 400, message: 'missing content' });
  } else {
    next();
  }
};

const uniqueClassName = async (req, res, next) => {
  // done for implementation of [put] class. This is called after validClass, so req.body.name MUST already exist before this is already ran. This then allows only this middleware to be clled on [put] class.
  if (!req.body.name) {
    next();
  } else {
    const classMaybe = await Instructor.getClassBy({ name: req.body.name });

    if (!classMaybe) {
      next();
    } else {
      next({ status: 403, message: 'class name already exists' });
    }
  }
};

const noIdChange = (req, res, next) => {
  if (req.body.instructor_id) {
    next({ status: 403, message: 'you cannot change instructor id' });
  } else {
    next();
  }
};

module.exports = {
  validClass,
  uniqueClassName,
  noIdChange,
};
