const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
const connection = require('../database/connection')

module.exports ={

   async validToken(data){
    var userId = ''
    const authHeader = data

    if(!authHeader){
        return "Token invalid"
    }
    // separa o token
    const parts = authHeader.split(' ')

    if(!parts.length === 2){
        return "Token invalid"

    }

    const [ scheme, token] = parts

    if(!/^Bearer$/i.test(scheme)){
        return "Token invalid"
    }

    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        if(err){
            return "Token invalid"
        }
        return userId = decoded.id
    })
   return userId
   },
   async createRoom(from_user,to_user, room){
    let data = {
        name:'',
        status: '',
        newRoom:''
    }
    const user = await connection('users').where('id',to_user).select('*').first()

    if(!user) return  data ={name:'',status:'User not found', newRoom:''}
   

    const rooms = await connection('messages').where('room',room).select('*').first()
    
    if(!rooms) {
        await connection('rooms').insert({
            room,
            from_user,
            to_user
        })
        const fromUser = await connection('users').where('id',from_user).select('*').first()
        await connection('messages').insert({
            message: `${fromUser.name} iniciou chat`,
            from_user,
            to_user,
            room
        })
        data ={
            name:fromUser.name,
            status:'OK',
            newRoom:'OK'
        }

    }
    return data
   },

   async roomPermitted(userId,room){
        
        const messages = await connection('messages').where('room',room).select('*').first()
    
        if(!messages) return 'Room not found'
        
        const from_user = await connection('messages').where('room',room)
                            .where('from_user', userId).select('from_user').first()
        const to_user = await connection('messages').where('room',room)
                            .where('to_user', userId).select('to_user').first()

        if( !(from_user||to_user) ) return 'Operation not permitted'

        return 'OK'
    },
    async AddMessagesBD(from_user,to_user,message,room){

        await connection('messages').insert({
            message,
            from_user,
            to_user,
            room
        })

        return 
    },

}