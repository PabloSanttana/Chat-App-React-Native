const connection = require('../database/connection')

module.exports = {

    async index(request,response){

        const userId = request.userId

        const from_user = await connection('rooms').where('from_user', userId).select('*')
        const to_user = await connection('rooms').where('to_user', userId).select('*')

        if(!(from_user.length >= 1 || to_user.length >= 1)) return response.status(404).json({error:'room not found'})

        const data = [
            ...from_user,
            ...to_user,
        ]

        return response.status(200).json(data)
    },
    async show(request,response){

        const userId = request.userId
        const {room} =  request.params

        const res = await connection('rooms').where('room', room).select('*').first()
        if(!res) return response.status(404).json({error:'room not found'})
        if( !(userId === res.from_user || userId === res.to_user )) return response.status(401).json({error: 'Unauthorized'})
      
        return response.status(200).json(res)
    },
}