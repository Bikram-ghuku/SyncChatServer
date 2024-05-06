const { DbService } = require('../services/db')
const db = new DbService()

const getMsg = async (req, res) => {
    const cid = req.body.chatId
    const user = req.body.user.id
    const result = await db.getMsg(cid, user);
    res.status(200).json(result)
}

module.exports = {getMsg}
