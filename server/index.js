const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require("socket.io");
const { connect } = require('http2');
app.use(cors());


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`);

    socket.on("join_room", (data) => {     
        socket.join(data);
        console.log(`User with ID" ${socket.id} joined room ${data}`);        
    })

    socket.on("send_message", (data) => {
        console.log(`sending to ${data.roomId}` );
        socket.to(data.roomId).emit("recieve_message", data);
    });

    socket.on("disconnect", () => {
        console.log(`user ${socket.id} disconnected`);
    })
});

server.listen(3030, () => {
    console.log("server running");
});