const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { TOKEN_SECRET } = require('../secrets/secret');

module.exports = router;
