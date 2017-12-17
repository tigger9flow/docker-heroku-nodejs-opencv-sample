const app        = require('express')();
const server     = require('http').Server(app);
const bodyParser = require('body-parser');
const socketIO   = require('socket.io');
const router     = require('./routes');
const sockets    = require('./sockets');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

sockets(socketIO(server, { origins: '*:*' }));

server.listen(PORT, err => {
    if (err) console.error(err);

    console.log(`Server is app and running on ${PORT} port.`)
});
