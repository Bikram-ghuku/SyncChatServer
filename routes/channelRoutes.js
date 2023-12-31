const express = require('express');
const {getChannels} = require('../controllers/channels');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
router.post('/channels', authenticateToken, getChannels);
module.exports = router;