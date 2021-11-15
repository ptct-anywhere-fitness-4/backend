const router = require('express').Router();
const Clients = require('./clients-model.js')

router.get("/", async (req,res)=>{
    Clients.getClients()
        .then((clients)=>{
            res.status(200).json(clients)
        })
        .catch((err)=>{
            res.status(500).json({message:err})
        })
})

router.post('/', async (req,res,next)=>{
    Clients.createClient(req.body)
    .then((client)=>{
        res.status(201).json(client)
    })
    .catch(next)
})



module.exports = router