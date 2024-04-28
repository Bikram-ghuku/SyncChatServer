const { PrismaClient } = require('@prisma/client')

class DbService{
    constructor(){
        this.db = new PrismaClient()
    }

    async addUser(userData){
        var retData;
        const {user, pswd, email} = userData;
        try{
            const data = await this.db.user.create({
                        data: {
                            name: user,
                            passWord: pswd,
                            email: email
                        }
                    }
                )
            retData = true
        }catch(err){
            retData = false
        }
        return retData
        
    }

    async getUser(email){
        return await this.db.user.findFirst({
            where:{
                email: email
            }
        })
    }
}

module.exports = {
    DbService
}