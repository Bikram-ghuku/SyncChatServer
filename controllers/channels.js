const { DbService } = require('../services/db')
const db = new DbService()

const getChannels = async (req, res) => {
    const user = req.body.user
	db.getChats(user).then((data) => {
    	res.status(200).json(data)
	})
}

const addChannels = async (req, res) => {
	const xd = await db.getUser(req.body.email)
	if(xd == null) return res.status(404).json({message: "User not found"})
	const {userId, email, name} = xd
	req.body.user2 = {userId, email, name}
	const ret = await db.createChat(req.body)
	if (ret) return res.status(201).json({message: 'Creation success'})
	else return res.status(409).json({message: 'Chat already exists'})
}

module.exports = { getChannels, addChannels }