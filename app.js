const express = require('express');
const app = express();
const port = 3000;
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/favicon.ico', express.static('public'));


io.on('connection', socket => {
    console.log('New user connected');

    socket.username = 'Anonymous';

    socket.on('change username', data => {
        socket.username = data.username;
      });

    socket.on('chat message', data => {
        io.sockets.emit('chat message', {message: data.message, username: socket.username});
      });

    socket.on('typing', () => {
      socket.broadcast.emit('typing', {username: socket.username});
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });

  httpServer.listen(port, () => {
    console.log('listening on port: 3000');
});