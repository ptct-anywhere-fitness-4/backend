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

//delete an existing class by ID
router.delete('/class/:id', async(req,res,next)=>{
    const { id } = req.params
    try{
        await Instructors.removeClass(id)
        res.status(200).json(req.class)
    }catch(err){
        next(err)
    }
})

//get an instructor's currently scheduled classes
router.get('/:id/schedule', async (req,res,next)=>{
const { id } = req.params
try{
    const schedule = await Instructors.getSchedule(id)
    res.status(200).json(schedule)
}catch(err){
    next(err)
}
    
})


//get class roster
router.get('/class/:id/roster', async(req,res,next)=>{

})

//mark student present
router.put('/class/:id/roster/:clientid', async(req,res,next)=>{
  
})




module.exports = router;
