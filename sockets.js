const sockets = io => {
    io.on('connection', socket => {
        socket.emit('connected', 'Connected successfully!');
    });
};

module.exports = sockets;
