const connection = require('../database/connection')

const RoomsController = require('./RoomController')

module.exports = {
    async show(request, response){
        const userId = request.userId
        const {room} = request.params

        const messages = await connection('messages').where('room',room).select('*')

        if(!messages.length >= 1) return response.status(404).json({
            error: 'Room not found'
        })

        const from_user = await connection('messages').where('room',room)
                            .where('from_user', userId).select('from_user').first()
        const to_user = await connection('messages').where('room',room)
                            .where('to_user', userId).select('to_user').first()


        if( !(from_user||to_user) ) return response.status(401).json({
            error: 'Operation not permitted'
        })

        const message = await messages[messages.length-1]

        return response.status(200).json({
            message: message.message,
            date: message.created_at,
            from_user: message.from_user
        })
        
    },
    async index(request,response){
        const userId = request.userId
       
        const {room} = request.params
        const messages = await connection('messages').where('room',room).select('*')
       
        
        if(!messages.length >= 1) return response.status(404).json({
            error: 'Room not found'
        })

        const from_user = await connection('messages').where('room',room)
                            .where('from_user', userId).select('from_user').first()
        const to_user = await connection('messages').where('room',room)
                            .where('to_user', userId).select('to_user').first()

        

        if( !(from_user||to_user) ) return response.status(401).json({
            error: 'Operation not permitted'
        })
      

        return response.json(messages)
    },
    async create(request,response){
        const {message,to_user, room} = request.body
        const from_user = request.userId

        const user = await connection('users').where('id',to_user).select('*').first()

        if(!user) return response.status(404).json('User not found')

        const messages = await connection('messages').where('room',room).select('*').first()

        if(!messages) {
            await connection('rooms').insert({
                room,
                from_user,
                to_user
            })
        }

        await connection('messages').insert({
            message,
            from_user,
            to_user,
            room
        })

        return response.status(204).send()
    },
    async delete(request, response){
        const {id} = request.params

        return response.json(data)
    }

}