const router = require('express').Router();
const Clients = require('./clients-model.js')

//get all clients
router.get("/", async (req,res)=>{
    Clients.getClients()
        .then((clients)=>{
            res.status(200).json(clients)
        })
        .catch((err)=>{
            res.status(500).json({message:err})
        })
})

//get client by id
router.get('/:id', async (req, res, next)=>{
    const {id} = req.params
    Clients.getClientById(id)
        .then((client)=>{
            res.status(200).json(client)
        }).catch((err)=>{
            res.status(500).json({message:err})
        })
})

//hit this user registration endpoint if user does not provide correct passcode to become an instructor
router.post('/', async (req,res,next)=>{
    Clients.createClient(req.body)
    .then((client)=>{
        res.status(201).json(client)
    })
    .catch(next)
})

//get all classes available
router.get('/classes', async (req,res,next)=>{
    Clients.getAllClasses()
        .then((classes)=>{
            res.status(200).json(classes)
        }).catch((err)=>{
            res.status(500).json({message:err})
        })
})

router.get

module.exports = router