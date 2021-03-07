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

io.on
("connection",socket=>{
    socket.on('status' , arrChatBox => {
        try{
            let arr = []
            arrChatBox.forEach(chatBox =>{
                if(socket.adapter.rooms.has(chatBox._chatBoxID))
                {
                    arr.push(chatBox._chatBoxID)
                    socket.broadcast.to(chatBox._chatBoxID).emit('online',[chatBox._chatBoxID])
                }
                socket.join(chatBox._chatBoxID)
            })
            socket.emit('online',arr)
        }
        catch(err){console.log(err)}
    })
   
})

app.use(express.static(path.join(__dirname,"static")))
app.use(express.json());
app.use('/api',router)

server.listen(port,()=>{
    console.log(port)
})