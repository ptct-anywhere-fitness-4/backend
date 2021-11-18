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


//get class by id
router.get('/classes/:id', async (req,res,next)=>{
    const { id } = req.params
    Clients.getClassById(id)
    .then((reqClass) => {
        res.status(200).json(reqClass);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  });

  //get class by filter
  router.get('/classes/:filter', async(req,res,next)=>{
      const { filter } = req.params
      Clients.getClassBy(filter)
      .then((reqClass) => {
        res.status(200).json(reqClass);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  })

  //register for class
  router.post('/classes/:id', async(req,res,next)=>{

  })

  //unregister for class
  router.delete('/classes/:id', async(req,res,next)=>{

  })


  //get list of currently registered classes
  router.get('/:id/classes/registered', async(req,res,next)=>{
      
  })
module.exports = router