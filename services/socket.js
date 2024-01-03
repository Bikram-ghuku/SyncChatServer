const { Server } = require('socket.io');

class SocketService {
    constructor() {
        this.io = new Server();
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
            socket.on("event:message", (data) => {
                console.log("New Chat msg: ",data);
            });
        });
    }
}

module.exports = SocketService;