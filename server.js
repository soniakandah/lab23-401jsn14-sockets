const express = require('express');
const app = express.createServer();
const io = require('socket.io').listen(app);

// Configuration

app.configure(function() {
    app.use(express.bodyParser());
    app.use(app.router);
});

io.configure(function() {
    io.set('transports', ['xhr-polling']);
    io.set('polling duration', 10);
});

// Routes

var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000
app.listen(port, function() {
    console.log(
        'Express server listening on port %d in %s mode',
        app.address().port,
        app.settings.env,
    );
});

app.get('/', (req, res, next) => {
    res.send('Homepage');
});

var status = 'All is well.';

io.sockets.on('connection', function(socket) {
    io.sockets.emit('status', { status: status }); // note the use of io.sockets to emit but socket.on to listen
    socket.on('reset', function(data) {
        status = 'War is imminent!';
        io.sockets.emit('status', { status: status });
    });
});
