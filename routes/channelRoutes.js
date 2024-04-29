const express = require('express');
const { getChannels, addChannels } = require('../controllers/channels');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
router.get('/channels', authenticateToken, getChannels);
router.post('/addChannels', authenticateToken, addChannels);
module.exports = router;