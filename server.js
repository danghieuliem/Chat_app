const express = require("express");
const app = express();
const path = require("path");

const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

const io = require("socket.io")(http);

io.on("connection", socket => {
    console.log("connected");
    socket.on("chat-messege", data => {
        socket.broadcast.emit("chat-messege", data)
    });
});

http.listen(PORT, () => {
    console.log("http://192.168.1.8:" + PORT);
});