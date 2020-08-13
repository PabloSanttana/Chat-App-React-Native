const express = require('express')
const multer = require('multer')
const multerconfig = require('./config/multer')

const routes = express.Router()


const UserController = require('./controllers/UserController')
const ContactController = require('./controllers/ContactController')
const AuthController = require('./controllers/AuthController')
const MessageController = require('./controllers/MessageController')
const RoomController = require('./controllers/RoomController')
const AuthMiddleware =  require('./middlewares/auth')


routes.get('/users', UserController.index)
routes.post('/users', UserController.create)
routes.get('/users/rooms',AuthMiddleware, RoomController.index)
routes.get('/users/new/rooms/:room',AuthMiddleware, RoomController.show)
routes.get('/user/:id',AuthMiddleware, UserController.show)
routes.put('/user',AuthMiddleware, UserController.update)


// post de image de perfil
routes.post('/user/image',AuthMiddleware,multer(multerconfig).single('file'),UserController.uploads)

routes.get('/contacts',AuthMiddleware, ContactController.index)
routes.post('/contacts',AuthMiddleware, ContactController.create)
routes.get('/contact/:id',AuthMiddleware, ContactController.show)
routes.put('/contacts/:id',AuthMiddleware, ContactController.updade)
routes.delete('/contacts/:id',AuthMiddleware, ContactController.delete)

// messages
routes.get('/contact/message/:room',AuthMiddleware, MessageController.index)
routes.get('/contact/message/preview/:room',AuthMiddleware, MessageController.show)
routes.post('/contact/message',AuthMiddleware, MessageController.create)
routes.delete('/contact/message/:id',AuthMiddleware, MessageController.delete)


// login
routes.post('/authenticate', AuthController.auth)
routes.get('/authenticate/token',AuthMiddleware, AuthController.autoAuth)


module.exports = routes