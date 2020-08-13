const bcrypt = require('bcryptjs')
const connection = require('../database/connection')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = {
    async auth(request, response){
     
       const {email, password} = request.body
       console.log(email, password)
        const user = await connection('users').where('email', email.toLowerCase()).select('*').first()

        if(!user){
            return response.status(400).json({
                error:'User not found'
            })
        }

        if(!await bcrypt.compare(password, user.password) ){
            return response.status(400).json({ error:'Invalid password or email'})
        }
       
        user.password = undefined

        const token = await jwt.sign({id: user.id}, authConfig.secret, {
            expiresIn: 86400,
        })

        response.json({...user,token})
    },

    async autoAuth(request, response){
        const user_id = request.userId

        const user =  await connection('users').where('id', user_id).select('*').first()

        if(!user) return response.status(404).json({error:'User not found'})
        user.password = undefined

        return response.json(user)

    }
}