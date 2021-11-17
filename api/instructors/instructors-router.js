const router = require('express').Router();
const Instructors = require('./instructors-model');
//get all instructors
router.get('/', async (req, res) => {
  Instructors.getInstructors()
    .then((instructors) => {
      res.json(req.decodedToken);
      res.status(200).json(instructors);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

//get instructor by id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  Instructors.getInstructorById(id)
    .then((instructor) => {
      res.status(200).json(instructor);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

//hit this user registration endpoint if user does provide correct passcode to become an instructor
router.post('/', async (req, res, next) => {
  Instructors.createInstructor(req.body)
    .then((instructor) => {
      res.status(201).json(instructor);
    })
    .catch(next);
});

//create new class (needs payload middleware)
router.post('/class', async (req, res, next) => {
  Instructors.createClass(req.body)
    .then((newClass) => {
      res.status(201).json(newClass);
    })
    .catch(next);
});

//get class by ID
router.get('/class/:id', async (req, res, next) => {
  const { id } = req.params;
  Instructors.getClassById(id)
    .then((reqClass) => {
      res.status(200).json(reqClass);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

//update an existing class by ID
router.put('/class/:id', async (req,res,next)=>{
    const { id } = req.params
    try{
        const updated = await Instructors.updateClass(id, req.body)
        res.status(200).json({updated})
    }catch(err){
        next(err)
    }
})




module.exports = router;
