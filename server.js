const express = require('express')
const http = require('http')
const path = require('path')
const mongoose = require('mongoose')
const router = require('./routers/index')
const socket = require('socket.io')

const port = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socket(server)

mongoose.connect(
    "mongodb://localhost:27017/chatapp",
    {useNewUrlParser:true}
)
const db = mongoose.connection
db.on("err",console.error.bind(console,"connection error : "))
db.once("open",()=>{
    console.log("connected to MongoDB")
})

const users = {}

io.on
("connection",socket=>{
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

app.use(express.static(path.join(__dirname,"static")))
app.use(express.json());
app.use('/api',router)

server.listen(port,()=>{
    console.log(port)
})