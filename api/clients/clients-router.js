const router = require('express').Router();
const Clients = require('./clients-model.js');
const onlyInstructor = require('../utils/onlyInstructor');
const { uniqueRegistration } = require('./client-middleware');
//get all clients //CHECK
router.get('/', onlyInstructor, async (req, res, next) => {
  Clients.getClients()
    .then((clients) => {
      res.status(200).json(clients);
    })
    .catch((err) => {
      next(err);
    });
});

//get client by id //CHECK
router.get('/:id', onlyInstructor, async (req, res, next) => {
  const { id } = req.params;
  Clients.getClientById(id)
    .then((client) => {
      if (!client) {
        next({ status: 404, message: 'client not found' });
      } else {
        res.status(200).json(client);
      }
    })
    .catch((err) => {
      next(err);
    });
});

//hit this user registration endpoint if user does not provide correct passcode to become an instructor
// ------ Endpoint not required because creation of client is done in /auth ------
/* 
router.post('/', async (req, res, next) => {
  Clients.createClient(req.body)
    .then((client) => {
      res.status(201).json(client);
    })
    .catch((err) => {
      next(err);
    });
});
*/

//get all classes // CHECK
// /classes gives an error, so I had to do /classes/all
router.get('/classes/all', async (req, res, next) => {
  try {
    const classes = await Clients.getAllClasses();
    res.status(200).json(classes);
  } catch (err) {
    next(err);
  }
});

//get class by id //CHECK
router.get('/classes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const clientClasses = await Clients.getClassById(id);

    if (clientClasses) {
      res.status(200).json(clientClasses);
    } else {
      next({ status: 404, message: 'classes not found' });
    }
  } catch (err) {
    next(err);
  }
});

//get class by filter. Don't think we will be using this
router.get('/classes/filter/:filter', async (req, res, next) => {
  try {
    const filteredClass = await Clients.getClassBy(req.params);
    res.status(200).json(filteredClass);
  } catch (err) {
    next(err);
  }
});

// DYNAMIC SORTING OF CLASSES SHOULD BE DONE ON FRONT END. IT SEEMS THE EASIEST.

//register for class
router.post(
  '/:client_id/classes/:class_id',
  uniqueRegistration,
  (req, res, next) => {
    Clients.registerClass(req.client_id, req.class_id)
      .then((registered) => {
        if (registered) {
          res.status(200).json({ message: 'succesfully registered client' });
        } else {
          next({ message: 'error during registration' });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
);

//unregister for class
router.delete('/:client_id/classes/:class_id', (req, res, next) => {
  const { client_id, class_id } = req.params;

  Clients.unregisterClass(client_id, class_id)
    .then((unregistered) => {
      if (unregistered) {
        res.status(201).json({ message: 'succesfully unregistered client' });
      } else {
        next({ message: 'error during unregistration' });
      }
    })
    .catch((err) => {
      next(err);
    });
});

//get list of currently registered classes
router.get('/:client_id/classes/registered', async (req, res, next) => {
  const { client_id } = req.params;

  Clients.getRegisteredList(client_id)
    .then((classes) => {
      res.status(200).json(classes);
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
