const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const SocketService = require('./services/socket')
const http = require('http')

const userRoutes = require('./routes/userRoutes')
const channelRoutes = require('./routes/channelRoutes')
const messageRoutes = require('./routes/msgsRoutes')

const server = express();
const httpServer = http.createServer(server)
const socketService = new SocketService();

socketService.init(httpServer);
socketService.initListeners();

server.use(cors());
server.use(bodyParser.json());

server.use('/users', userRoutes)
server.use('/channels', channelRoutes)
server.use('/message', messageRoutes)

httpServer.listen(process.env.PORT || 3001, () => {
    console.log('Socket server started on port:', process.env.PORT || 3001);
});