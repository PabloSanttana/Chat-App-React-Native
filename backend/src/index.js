const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()
const socketio = require('socket.io')
const server = require('http').createServer(app);
const io = socketio(server);

const {validToken,createRoom,roomPermitted,AddMessagesBD} = require('./socket/soket')

app.use(cors())

app.use(express.static(__dirname + '/tmp'));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(routes)

io.on('connection', (socket) =>{
    console.log('socket On')
    var userID =''

    socket.on('join', async (message, callback) =>{
        const response = await validToken(message.token)
        if(response === "Token invalid") return console.log('Operation not permitted')
        userID = response
        const to_user = message.from_user === response?  message.to_user : message.from_user
       

       const initializeChat = await createRoom(response,to_user,message.room)
       if(initializeChat.status === 'User not found') return callback('User not found')
       
       socket.join(message.room)
       
    })


    socket.on('sendMessage', async (messages, callback)=>{
        const from_user = userID
        if(userID === '') return 
       const response = await roomPermitted(from_user,messages.room)
      if(response !== 'OK') return callback(false)
       const to_user = from_user === messages.from_user? messages.to_user : messages.from_user
        console.log('from_user',from_user)
        console.log('to_user', to_user)
        console.log('message', messages)
        io.to(messages.room).emit('message', {
            id:messages.id,
            created_at: messages.created_at,
            from_user,
            to_user,
            room: messages.room,
            message: messages.message
        })
        
        callback(true)
       await AddMessagesBD(from_user,to_user,messages.message,messages.room)
       
    })
})



server.listen(3333)