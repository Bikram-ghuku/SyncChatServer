const jwt = require('jsonwebtoken')
const { DbService } = require('../services/db')
const db = new DbService()

const chats1 = [
    {
		"name": ["User", "NotUser"],
		"url": "https://randomuser.me/api/portraits/women/5.jpg",
		"lastMsg": "Hi there",
		"lastTime": "8:23"
	}
]

const getChannels = (req, res) => {
    const chats = JSON.parse(JSON.stringify(chats1))
    const email = req.body.user.name
    const channels = chats.filter(chat => chat.name.includes(email))
    channels.forEach((data) => {
        var newChannel = []
		for(var i = 0; i < data.name.length; i++){
			if(data.name[i] != email) newChannel.push(data.name[i])
		}
		data.name = newChannel
    })
    res.json(channels)
}

const addChannels = async (req, res) => {
	const {userId, email, name} = await db.getUser(req.body.email)
	req.body.user2 = {userId, email, name}
	const ret = await db.createChat(req.body)
	if (ret) return res.status(201).json({message: 'Creation success'})
	else return res.status(409).json({message: 'Chat already exists'})
}

module.exports = { getChannels, addChannels }