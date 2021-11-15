const router = require('express').Router();
const Instructors = require('./instructors-model.js')

//get all instructors
router.get("/", async (req,res)=>{
    Instructors.getinstructors()
        .then((instructors)=>{
            res.status(200).json(instructors)
        })
        .catch((err)=>{
            res.status(500).json({message:err})
        })
})

//get instructor by id
router.get('/:id', async (req, res, next)=>{
    const {id} = req.params
    Instructors.getInstructorById(id)
        .then((instructor)=>{
            res.status(200).json(instructor)
        }).catch((err)=>{
            res.status(500).json({message:err})
        })
})

//hit this user registration endpoint if user does provide passcode to become an instructor
router.post('/', async (req,res,next)=>{
    Instructors.createInstructor(req.body)
    .then((instructor)=>{
        res.status(201).json(instructor)
    })
    .catch(next)
})


module.exports = router