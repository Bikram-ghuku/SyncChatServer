const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { DbService } = require('../services/db');

var users = []
var cnt = 1;
const db = new DbService()

const login = async (req, res) => {
    var user;
    db.getUser(req.body.email).then((data) => {
        user = data
    
        if (user) {
            bcrypt.compare(req.body.pswd, user.passWord).then((valid) => {
                if (valid) {
                    const token = jwt.sign({email: user.email, name: user.name, id: user.userId}, process.env?.TOKEN, {expiresIn: '24h'})
                    res.status(200).json({token, name:user.name, email:user.email, id: user.userId})
                } else {
                    res.status(401).json({message: 'Invalid credentials'})
                }
            }).catch((error) => {
                res.status(500).json({error})
            })
        } else {
            res.status(401).json({message: 'Invalid credentials'})
        }
    })
}

const register = async (req, res) => {
    const user = users.find(user => user.email === req.body.email)
    if (user) {
        res.status(409).json({message: 'User already exists'})
    }else{
        bcrypt.hash(req.body.pswd, 10).then((hash) => {
            db.addUser({user: req.body.name, pswd: hash, email: req.body.email}).then((err)=>{
                    if(err) return res.status(201).json({message: 'User created successfully'})
                    else res.status(409).json({message: 'User already exsists'})
                })
        }).catch((error) => {
            res.status(500).json({error})
        })
    }
}

const githubRegister = async(req, res) => {
    const uri = `https://github.com/login/oauth/access_token?client_id=${process.env.GH_CLIENT_ID}&client_secret=${process.env.GH_PRIVATE_ID}&code=${req.body.code}`
    fetch(uri, {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        fetch('https://api.github.com/user', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + data.access_token
            }
        }).then((data) => {
            return data.json()
        }).then((resp) => {
            const name = resp.name
            const uname = resp.login
            const id = resp.id
            const url = resp.avatar_url
            try{
                db.addUser({user: name, pswd: id, email: uname, url: url}).then((err)=>{
                    db.getUser(uname).then((user) => {
                        if(user && user.passWord == id){
                            const token = jwt.sign({email: user.email, name: user.name, id: user.userId}, process.env?.TOKEN, {expiresIn: '24h'})
                            res.status(200).json({token, name:user.name, email:user.email, id: user.userId, url: url})
                        }
                    })
                })
                
            }catch(err){
                console.log(err)
                db.getUser(uname).then((user) => {
                    if(user.passWord == id){
                        const token = jwt.sign({email: user.email, name: user.name, id: user.userId}, process.env?.TOKEN, {expiresIn: '24h'})
                        res.status(200).json({token, name:user.name, email:user.email, id: user.userId, url: url})
                    }
                })
            }

            
        })
    }) 

}

module.exports = {
    login,
    register,
    githubRegister
}