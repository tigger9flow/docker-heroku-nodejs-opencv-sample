const sockets = io => {
    io.on('connection', socket => {
        socket.emit('connected', 'Connected successfully!');

        socket.on('frame', data => {
            try {
                io.emit('capture', {
                    base64Str: new Buffer(data.buffer).toString('base64')
                });
            } catch (e) {
                return io.emit('captureError', {
                    error: e.toString()
                });
            }
        });
    });
};

module.exports = sockets;
