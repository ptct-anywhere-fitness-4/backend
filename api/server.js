const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./data/db-config');

const restrict = require('./utils/restricted.js');

const authRouter = require('./auth/auth-router');
const instructorRouter = require('./instructors/instructors-router.js');
const clientRouter = require('./clients/clients-router.js');
const server = express();

const Instructor = require('./instructors/instructors-model');
const Client = require('./clients/clients-model');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/instructor', restrict, instructorRouter);
server.use('/api/client', restrict, clientRouter);

server.get('/', (req, res) => {
  res.status(201).json({ message: 'shariq was here' });
});

server.get('/random', async (req, res, next) => {
  const modelMaybe = await Instructor.getSchedule(1);
  res.json(modelMaybe);
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
