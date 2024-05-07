const express = require('express');
const authenticateToken = require('../middleware/auth');
const {getMsg, readMsg} = require('../controllers/messages')

const router = express.Router()

router.post('/getMsgs', authenticateToken, getMsg)

module.exports = router