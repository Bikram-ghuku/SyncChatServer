const express = require('express');
const authenticateToken = require('../middleware/auth');
const {sendMsg, getMsg} = require('../controllers/messages')

const router = express.Router()

router.get('/getMsgs', authenticateToken, getMsg)
router.post('/sendMsgs',authenticateToken, sendMsg)

module.exports = router