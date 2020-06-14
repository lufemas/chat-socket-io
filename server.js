const express  = require('express')
const app      = express()
const PORT     = 3000
const server   = app.listen(PORT, () => {console.log(`Server running at http://localhost:${PORT}`)})
const io       = require('socket.io').listen(server)
const { v4: uuidv4 } = require('uuid');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.use(express.static('.'))


const loggedUsers = []
const messagesLog = []

// SERVER.JS SERVER-NODE
io.on('connection', function (socket) {

    // Listen for a "newuser" message
    socket.on('login', (data) => {
      
      loggedUsers.push({
         id : data.id,
         username: data.username
      })

      console.table(loggedUsers)

      io.to(data.id).emit('messageHistory', messagesLog)
      io.to(data.id).emit('loggedUsers', loggedUsers)
      socket.broadcast.emit('newuser', data)
    })

    socket.on('message', (data) => {
       
        // Transmit a message to everyone except the sender
     //    socket.broadcast.emit('newuser', data)
         messagesLog.push(data)
         console.log(messagesLog)
        // The same message, sent to all users - try it!
        socket.broadcast.emit('message', data)
     })

     socket.on('typing', (userID) => {
       
      socket.broadcast.emit('typing', userID)
   })

   socket.on('notTyping', (userID) => {
       
    socket.broadcast.emit('notTyping', userID)
 })



 })