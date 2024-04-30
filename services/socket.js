const { Server } = require('socket.io');
const sendMsg = require('../controllers/messagesSocket')
const jwt = require('jsonwebtoken')


class SocketService {
    constructor() {
        this.io = new Server({
            cors:{
                allowedHeaders: ["*"],
                origin: "*",
            }
        });
    }
    
    init(server) {
        this.io.attach(server);
    }
    
    getIO() {
        return this.io;
    }

    initListeners() {
        const io = this.io;
        io.on('connection', (socket) => {
            console.log('a user connected', socket.id);
            socket.on('disconnect', () => {
                console.log('user disconnected', socket.id);
            });
            socket.on("message", (data) => {
                const userData = jwt.verify(data.jwt, process.env.TOKEN);
                data.name = userData.name
                io.emit("message", data)
                sendMsg(data)
            });
        });
    }
}

module.exports = SocketService;