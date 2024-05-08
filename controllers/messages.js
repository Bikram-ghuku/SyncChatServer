const { DbService } = require('../services/db')
const db = new DbService()

const getMsg = async (req, res) => {
    const cid = req.body.chatId
    const user = req.body.user.id
    const skipMul = req.body.multi
    const result = await db.getMsg(cid, user, skipMul);
    res.status(200).json(result)
}

const readMsg = async (req, res) => {
    const cid = req.body.chatId
    const user = req.body.user.id
    const resu = await db.readMsg(cid, user)
    res.status(200).json(resu)
}

module.exports = { getMsg, readMsg }
