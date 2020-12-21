const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')
const port = process.env.PORT || 5000

app.use(express.static(path.join(__dirname,"static")))

const users = {}
http.listen(port ,()=>{
    console.log("new user is joined !!")
})

io.on("connection",socket=>{
    socket.on('new-user',name=>{
        users[socket.id] = name
        socket.broadcast.emit('user-connected',name)
    })
    socket.on('chat-message',message=>{
        socket.broadcast.emit('chat-message',message,users[socket.id])
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
    })
})