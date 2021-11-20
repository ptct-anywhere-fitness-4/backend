const router = require('express').Router();
const Instructors = require('./instructors-model');
const onlyInstructor = require('../utils/onlyInstructor');
const {
  validClass,
  uniqueClassName,
  noIdChange,
} = require('./instructors-middleware');

//get all instructors
router.get('/', async (req, res, next) => {
  try {
    const instructors = await Instructors.getInstructors();
    if (instructors) {
      res.status(200).json(instructors);
    } else {
      next({ status: 404, message: 'error grabbing instructors' });
    }
  } catch (err) {
    next(err);
  }
});

//get instructor by id
router.get('/:id', async (req, res, next) => {
  try {
    const instructor = await Instructors.getInstructorBy(req.params.id);

    if (instructor) {
      res.status(200).json(instructor);
    } else {
      next({ status: 404, message: 'error grabbing instructor' });
    }
  } catch (err) {
    next(err);
  }
});

// ---  This is already done in auth  ---
// router.post('/', async (req, res, next) => {
//   Instructors.createInstructor(req.body)
//     .then((instructor) => {
//       res.status(201).json(instructor);
//     })
//     .catch(next);
// });

//instructor creating a new class
router.post(
  '/class',
  onlyInstructor,
  validClass,
  uniqueClassName,
  async (req, res, next) => {
    try {
      const newClass = await Instructors.createClass(req.body);
      if (newClass) {
        res.status(201).json(newClass);
      } else {
        next({ status: 500, message: 'error creating class' });
      }
    } catch (err) {
      next(err);
    }
  }
);

//get class by ID
router.get('/class/:class_id', async (req, res, next) => {
  try {
    const gotClass = await Instructors.getClassById(req.params.class_id);

    if (!gotClass) {
      next({ status: 404, message: 'class not found' });
    } else {
      res.status(200).json(gotClass);
    }
  } catch (err) {
    next({ message: 'error grabbing class' });
  }
});

//update an instructor's class. Given class id
router.put(
  '/class/:class_id',
  onlyInstructor,
  uniqueClassName,
  noIdChange,
  async (req, res, next) => {
    try {
      const updatedClass = await Instructors.updateClass(
        req.params.class_id,
        req.body
      );
      res.status(200).json(updatedClass);
    } catch (err) {
      next(err);
    }
  }
);

//delete an existing class by ID
router.delete('/class/:id', onlyInstructor, async (req, res, next) => {
  try {
    const deletedClassId = await Instructors.removeClass(req.params.id);
    res.status(201).json(deletedClassId);
  } catch (err) {
    next(err);
  }
});

//get an instructor's currently scheduled classes
router.get('/:instructor_id/schedule', async (req, res, next) => {
  try {
    const schedule = await Instructors.getSchedule(req.params.instructor_id);
    res.status(200).json(schedule);
  } catch (err) {
    next(err);
  }
});

//get class roster
router.get('/class/:class_id/roster', async (req, res, next) => {
  try {
    const roster = await Instructors.getClassRoster(req.params.class_id);
    res.status(200).json(roster);
  } catch (err) {
    next(err);
  }
});

//mark student present
router.put('/class/:class_id/roster/:client_id', async (req, res, next) => {
  try {
    const updatedClientId = await Instructors.markPresent(
      req.params.class_id,
      req.params.client_id
    );
    res.status(201).json(updatedClientId);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
