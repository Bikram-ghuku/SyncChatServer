const jwt = require('jsonwebtoken')

const chats = [
    {
        members: ['1', 'user2@gmail.com'],
        id: 1,
    },
    {
        members: ['1', 'user2@gmail.com', 'user3@gmail.com'],
        id: 2,
    }
]

const getChannels = (req, res) => {
    const data = jwt.verify(req.body.token, process.env.TOKEN)
    const channels = chats.filter(chat => chat.members.includes(data.email))
    res.json(channels)
}

module.exports = {getChannels}