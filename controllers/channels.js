const { DbService } = require('../services/db')
const db = new DbService()

const chats1 = [
    {
		"name": ["bikram", "NotUser"],
		// "url": "https://randomuser.me/api/portraits/women/5.jpg",
		// "lastMsg": "Hi there",
		// "lastTime": "8:23"
	}
]

const getChannels = async (req, res) => {
    const user = req.body.user
	db.getChats(user).then((data) => {
		console.log(data)
    	res.status(200).json(data)
	})
}

const addChannels = async (req, res) => {
	const {userId, email, name} = await db.getUser(req.body.email)
	req.body.user2 = {userId, email, name}
	const ret = await db.createChat(req.body)
	if (ret) return res.status(201).json({message: 'Creation success'})
	else return res.status(409).json({message: 'Chat already exists'})
}

module.exports = { getChannels, addChannels }