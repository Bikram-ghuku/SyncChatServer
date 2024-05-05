const jwt = require('jsonwebtoken')
const { DbService } = require('../services/db')

const db = new DbService()
const sendMsg = async (data) => {
    const token = data.jwt
    const msg = data.msg
    const currTime = new Date(Date.parse(data.timeStamp));
    const currTimeISO = currTime.toISOString()
    const chatId = data.chatId
    try{
        const tokenData = jwt.verify(token, process.env.TOKEN);
        await db.setLastMsg(chatId, msg)
        const dataMsgStore = {senderId: tokenData.id, chanId: chatId, msg: msg, time: currTimeISO}
        await db.storeMsg(dataMsgStore)
    }catch(e){
        console.log("Socket message receive error: ", e)
    }
}

module.exports = sendMsg