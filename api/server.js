const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./data/db-config');

const restrict = require('./middleware/restricted.js');

const clientRouter = require('./clients/clients-router.js');
const instructorRouter = require('./instructors/instructors-router.js');

function getAllUsers() {
  return db('users');
}

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db('users').insert(user, [
    'user_id',
    'username',
    'password',
  ]);
  return newUserObject; // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/client', restrict, clientRouter);
server.use('/api/instructor', restrict, instructorRouter);
// server.use('/api/auth', authRouter) --> creating token, logging out etc. creaint token, buildToken()

// how we will route grabbing classses --> KNOW THERE IS A QUESTION BUT IDK HOW TO ASK IT UNTIL I START MODELING
server.get('/potato', (req, res) => {
  res.status(201).json({ message: 'shariq was here' });
});
server.get('/api/users', async (req, res) => {
  res.json(await getAllUsers());
});

server.post('/api/users', async (req, res) => {
  res.status(201).json(await insertUser(req.body));
});

module.exports = server;
