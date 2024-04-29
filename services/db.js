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

    async createChat(data){
        const user1 = data.user
        const user2 = data.user2
        const data2 = await this.db.$queryRaw`SELECT DISTINCT a.chat_id, a.sender_id, b.sender_id FROM chats_data a INNER JOIN chats_data b ON a.chat_id = b.chat_id AND a.sender_id != b.sender_id`
        console.log(data2)
        if(data2.length > 1) return false
        const userCreate = await this.db.chats.create({
            data: {
                SenderId: user1.id
            }
        })

        const secUser = await this.db.chats.create({
            data: {
                ChatId: userCreate.ChatId,
                SenderId: user2.userId
            }
        })

        return true
    }
}

module.exports = {
    DbService
}