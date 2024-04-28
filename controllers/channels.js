const jwt = require('jsonwebtoken')

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
    const email = req.user.name
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

module.exports = {getChannels}