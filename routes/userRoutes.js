const express = require('express');
const {login, register, githubRegister} = require('../controllers/user');

const router = express.Router();


router.post('/login', login);
router.post('/register', register);
router.post('/ghreg', githubRegister)

module.exports = router;