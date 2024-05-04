const { PrismaClient } = require('@prisma/client')

class DbService{
    constructor(){
        this.db = new PrismaClient()
    }

    async addUser(userData){
        const {user, pswd, email, url} = userData;
        if(user == undefined || pswd == undefined || email == undefined) return false
        try{
            const data = await this.db.user.create({
                        data: {
                            name: user,
                            passWord: pswd.toString(),
                            email: email,
                            url: url
                        }
                    }
                )
                
            return true
        }catch(err){
            console.log(err)
            return false
        }
        
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
        const data2 = await this.db.$queryRaw`SELECT DISTINCT a.chat_id, a.sender_id, b.sender_id FROM chats_data a INNER JOIN chats_data b ON a.chat_id = b.chat_id AND a.sender_id != b.sender_id WHERE a.sender_id = ${user1.id} AND b.sender_id = ${user2.userId}`
        if(data2.length > 0) return false
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

    async getChats(user){
        const { id } = user;
        var retData = []
        const data = await this.db.$queryRaw`SELECT DISTINCT a.chat_id, a.sender_id, b.sender_id, a.last_msg FROM chats_data a INNER JOIN chats_data b ON a.chat_id = b.chat_id AND a.sender_id != b.sender_id WHERE a.sender_id = ${id}`
        for(var i = 0; i < data.length; i++){
            var recData = await this.db.user.findFirst({
                where: {
                    userId: data[i].sender_id
                },
                select: {
                    name: true,
                    userId: true,
                    passWord: false,
                    url: true,
                    lastOnline: true
                }
            })
            recData.chanId = data[i].chat_id
            recData.lastMsg = data[i].last_msg
            retData.push(recData)
        }
        return retData
    }

    async setLastMsg(chanId, msg){
        await this.db.chats.updateMany({
            where: {
                ChatId: chanId
            },
            data:{
                LastMsg: msg
            }
        })
    }

    async setLastOnline(time, userId){
        await this.db.user.update({
            where:{
                userId: userId
            }, 
            data:{
                lastOnline: time
            }
        })
    }
}

module.exports = {
    DbService
}