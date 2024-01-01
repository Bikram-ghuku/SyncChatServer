const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

var users = []
var cnt = 1;

const login = async (req, res) => {
    const user = users.find(user => user.email === req.body.email)
    if (user) {
        bcrypt.compare(req.body.pswd, user.pswd).then((valid) => {
            if (valid) {
                const token = jwt.sign({email: user.email, name: user.name}, process.env?.TOKEN, {expiresIn: '24h'})
                res.status(200).json({token, name:user.name, email:user.email})
            } else {
                res.status(401).json({message: 'Invalid credentials'})
            }
        }).catch((error) => {
            res.status(500).json({error})
        })
    } else {
        res.status(401).json({message: 'Invalid credentials'})
    }
}

const register = async (req, res) => {
    const user = users.find(user => user.email === req.body.email)
    if (user) {
        res.status(409).json({message: 'User already exists'})
    }else{
        bcrypt.hash(req.body.pswd, 10).then((hash) => {
            const user = {
                name: req.body.name,
                email: req.body.email,
                pswd: hash,
                id: cnt++
            }
            users.push(user)
            res.status(201).json({message: 'User created successfully'})
        }).catch((error) => {
            res.status(500).json({error})
        })
    }
}

module.exports = {
    login,
    register
}