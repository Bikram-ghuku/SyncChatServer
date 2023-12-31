const express = require('express');
const {getChannels} = require('../controllers/channels');

const router = express.Router();
router.post('/channels', getChannels);
module.exports = router;