const jwt = require('jsonwebtoken')

const sendMsg = (data) => {
    const token = data.jwt
    const msg = data.msg
    const currTime = data.timeStamp;
    const chatId = data.chatId
    try{
        const data = jwt.verify(token, process.env.TOKEN);
        console.log(`Received message from ${data.name} on ${chatId}: ${msg} at time ${currTime}`)
    }catch{
        console.log("Socket message receive error")
    }
}

module.exports = sendMsg