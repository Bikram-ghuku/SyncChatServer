const jwt = require('jsonwebtoken')

const chats1 = [
    {
		"name": ["Mrs Erica Graves", "NotUser"],
		"url": "https://randomuser.me/api/portraits/women/5.jpg",
		"lastMsg": "Hi there",
		"lastTime": "8:23"
	},
	{
		"name": ["Mrs Melike Yıldırım", "User"],
		"url": "https://randomuser.me/api/portraits/women/93.jpg",
		"lastMsg": "Hi there",
		"lastTime": "1:29"
	},
	{
		"name": ["Mr Toivo Sippola", "User"],
		"url": "https://randomuser.me/api/portraits/men/51.jpg",
		"lastMsg": "How are you doing",
		"lastTime": "1:39"
	},
]

const getChannels = (req, res) => {
    const chats = JSON.parse(JSON.stringify(chats1))
    const email = req.user.name
    const channels = chats.filter(chat => chat.name.includes(email))
    channels.forEach((data) => {
        data.name.pop(email)
    })
    res.json(channels)
}

module.exports = {getChannels}