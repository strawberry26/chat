const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    });
});

server.listen(process.env.PORT || 3001, '0.0.0.0', () => {
    console.log("Server is running.");
});