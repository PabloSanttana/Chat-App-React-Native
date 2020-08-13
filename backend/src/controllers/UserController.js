const connection = require('../database/connection')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports ={

    async index(request, response){
        const users = await connection('users').select('*')

        response.json(users)
    },

    async create(request, response){
        const {name, email, phone, image, password} = request.body

        const user = await connection('users').where('email', email).select('*').first()

        if(user){
            return response.json({
                error:'User already exists'
            })
        }

        const id = crypto.randomBytes(8).toString('HEX')
        const DATE = new Date()
        const room = DATE.getTime()
        const hash = await  bcrypt.hash(password, 10)
    
        await connection('users').insert({
            id,
            name,
            email: email.toLowerCase(),
            phone,
            image,
            password: hash,
            room:room
        })

        const token = await jwt.sign({id: id}, authConfig.secret, {
            expiresIn: 86400,
        })
        
        return response.json({
            id,
            name,
            email,
            phone,
            image,
            token,
            room
        })
    },

    async show(request, response){
        const {id} = request.params

        const user = await connection('users').where('id', id).select('*').first()

        if(!user){
            return response.status(404).json({
                error: 'User not found'
            })
        }

        user.password = undefined

        response.json(user)
    },

    async update(request, response){
        const id = request.userId
        const {name, email, passwordPrevious,passwordNew, image, phone} = request.body

        var password = undefined

        const User = await connection('users').where('id', id).select('*').first()

        if(passwordPrevious && passwordNew){
            
            if(!await bcrypt.compare(passwordPrevious, User.password) ){
                return response.status(400).json({ error:'Invalid password'})
            }

            const hash = await  bcrypt.hash(passwordNew, 10)

            password = hash 
        }


        const user = {
            name,
            email,
            phone,
            image,
            password
        }

      

      
        if(User.id !== id ){
            return response.status(401).json({ error: 'Operation not permitted'})
        }

        await connection('users').where('id', id).update(user)

        return response.json({
            status: "Update successfully"
        }
        )
    },

    async uploads(request,response){
        const id = request.userId
      
       
        const urlImage=  `http://192.168.0.22:3333/uploads/${request.file.filename}`

        await connection('users').where('id',id).update({
            image:urlImage
        })

        return response.json({
            image: 'Envida com sucesso',
            urlImage
        })
    }

    
}