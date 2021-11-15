const router = require('express').Router();
const Instructors = require('./instructors-model.js')

router.get("/", async (req,res)=>{
    Instructors.getinstructors()
        .then((instructors)=>{
            res.status(200).json(instructors)
        })
        .catch((err)=>{
            res.status(500).json({message:err})
        })
})

router.post('/', async (req,res,next)=>{
    Instructors.createInstructor(req.body)
    .then((instructor)=>{
        res.status(201).json(instructor)
    })
    .catch(next)
})


module.exports = router