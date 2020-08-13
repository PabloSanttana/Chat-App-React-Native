const connection = require('../database/connection')

module.exports = {

    async index (request, response){
        const user_id = request.userId

        const contacts = await connection('contacts').where('user_id',user_id).select('*')

        return response.json(contacts)
    },

    async show(request, response){
        const user_id = request.userId
        const { id } = request.params
        const contact = await connection('contacts').where('user_id',user_id)
                                        .where('contact_id',  id).select('*').first()

        if(!contact) return response.status(404).json({
            error: 'Contact not found'
        })
        return response.json(contact)
    },

    


    async create(request, response){
        const { name, email} = request.body
        const user_id = request.userId

        const user = await connection('users').where('email',  email.toLowerCase()).select('*').first()

        if(!user){
            return response.status(404).json({
                error:'Contact not found'
            })
        }

        const contact = await connection('contacts').where('user_id',user_id)
                                        .where('contact_id',  user.id).select('*').first()


        if(contact){
            return response.status(400).json({
                error: 'Contact already exists'
            })
        }
       
        if(!(user.id !== user_id)){
            return response.status(401).json({
                error: 'User invalid'
            })
        }
        user.name = name
        user.password = undefined
      

        await connection('contacts').insert({
            name: user.name,
            contact_id: user.id,
            user_id
        })
        response.json({
            ...user,
            user_id
        })
    },

    async delete(request, response){
        const { id } = request.params
        const user_id = request.userId

        const contact = await connection('contacts').where('id', id).select('user_id').first()

        if(contact.user_id !== user_id ){
            return response.status(401).json({ error: 'Operation not permitted'})
        }

        await connection('contacts').where('id', id).delete()

        return response.status(204).send()
    },

    async updade(request, response){
        const {name} = request.body
        const { id } = request.params
        const user_id = request.userId

        const contact = await connection('contacts').where('id', id).select('user_id').first()

        
        if(contact.user_id !== user_id ){
            return response.status(401).json({ error: 'Operation not permitted'})
        }

        await connection('contacts').where('id', id).update({
            name: name
        })

        return response.json({
            status: "Update successfully"
        })

    }
}