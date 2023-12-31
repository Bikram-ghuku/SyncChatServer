const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

const userRoutes = require('./routes/userRoutes')
const channelRoutes = require('./routes/channelRoutes')

const server = express();
server.use(cors());
server.use(bodyParser.json());

server.use('/users', userRoutes)
server.use('/channels', channelRoutes)

server.listen(process.env.PORT || 3030, () => {
    console.log('Server started on port:', process.env.PORT || 3030);
});