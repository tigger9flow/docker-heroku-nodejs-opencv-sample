const cv = require('opencv');
const CYAN_COLOR = [255, 255, 0];
const RECT_THICKNESS = 2;

const sockets = io => {
    io.on('connection', socket => {
        socket.emit('connected', 'Connected successfully!');

        socket.on('moved', value => socket.broadcast.emit('moved', value));

        socket.on('frame', data => {
            cv.readImage(data.buffer, (_, img) => {
                img.detectObject(cv.FACE_CASCADE, {}, (_, faces) => {
                    io.emit(
                        faces.length ? 'faceDetected' : 'faceNotDetected'
                    );

                    faces.forEach(face =>
                        img.rectangle(
                            [face.x, face.y],
                            [face.width, face.height],
                            CYAN_COLOR,
                            RECT_THICKNESS
                        )
                    );

                    socket.broadcast.emit('capture', {
                        base64Str: img
                            .toBuffer()
                            .toString('base64')
                    });
                });
            });
        });
    });
};

module.exports = sockets;
