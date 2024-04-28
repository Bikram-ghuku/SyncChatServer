const { PrismaClient } = require('@prisma/client')

class DbService{
    constructor(){
        this.db = new PrismaClient()
    }

    async addUser(userData){
        const {user, pswd, email} = userData;
            this.db.User.create({
                    data: {
                        name: user,
                        passWord: pswd,
                        email: email
                    }
                }
            ).then(() => {
                return true
            }).catch(() => {
                return false
            })
        
    }
}

module.exports = {
    DbService
}