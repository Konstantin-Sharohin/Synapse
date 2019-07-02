const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/index.html');
});

app.use('/favicon.ico', express.static('app/favicon.ico'));


io.on('connection', socket => {
    console.log('a user connected');

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
      });

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });

httpServer.listen(3000, () => {
    console.log('listening on port: 3000');
});