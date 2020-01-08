const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(server);

// Configuration

// Routes

var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000
app.listen(port, function() {
    console.log('Express server listening');
});

app.get('/', (req, res, next) => {
    res.send('Homepage');
});

var status = 'All is well.';

io.on('connection', function(socket) {
    io.emit('status', { status: status }); // note the use of io.sockets to emit but socket.on to listen
    socket.on('reset', function(data) {
        status = 'War is imminent!';
        io.emit('status', { status: status });
    });
});
