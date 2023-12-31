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
    const email = req.user.email
    const channels = chats.filter(chat => chat.members.includes(email))
    res.json(channels)
}

module.exports = {getChannels}