
var msgs = []
var curr = 0;

const sendMsg = (req, res) => {
    const cid = req.body.chatId
    if(!cid) return res.status(400).send("No chat id")
    const sender = req.user.name
    if(!sender) return res.send(401).send("No user found")
    const msg = req.body.msg
    const currTime = new Date().toLocaleString();
    const obj = {}
    obj.msgId = curr
    obj.cid = cid
    obj.sender = sender
    obj.msg = msg
    obj.currTime = currTime
    msgs.push(obj)
    curr++
    res.status(200).send("OK")
}


const getMsg = (req, res) => {
    const cid = req.body.chatId
    const user = req.user
    console.log(msgs)
    const msg = msgs.filter(msg => msg.cid == cid)
    console.log(msg)
    res.status(200).send('')
}

module.exports = {sendMsg, getMsg}
