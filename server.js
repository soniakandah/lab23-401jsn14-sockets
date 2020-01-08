const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(server);

// Configuration

// Routes

let messages = [];

var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000
app.listen(port, function() {
    console.log('Express server listening');
});

app.get('/', (req, res, next) => {
    res.send(messages);
});

io.on('received message', function(data) {
    messages.push(data);
});

io.on('connection', function(socket) {
    socket.emit('new connection', socket);
    socket.on('message', function(data) {
        io.emit('received message', data);
    });
});
