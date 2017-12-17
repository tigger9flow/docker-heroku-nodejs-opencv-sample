const sockets = io => {
    io.on('connection', socket => {
        socket.emit('connected', 'Connected successfully!');

        socket.on('frame', data => io.emit('capture', data));
    });
};

module.exports = sockets;
