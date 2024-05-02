const jwt = require('jsonwebtoken');
const { DbService } = require('../services/db')
const db = new DbService()

const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.TOKEN);
        const time = new Date();
        req.body.user = data
        db.setLastOnline(time, data.id)
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid token'});
    }
}

module.exports = authenticateToken;