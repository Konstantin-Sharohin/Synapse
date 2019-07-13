const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const server = http.createServer(app);
const io = require('socket.io')(server);


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('New user connected');

  socket.username = 'Anonymous';

  socket.on('change username', data => {
    socket.username = data.username;
  });

  socket.on('chat message', data => {
    io.sockets.emit('chat message', {message: data.message, username: socket.username});
  });

  socket.on('typing', data => {
    socket.broadcast.emit('notifyTyping', {username: socket.username, message: data.message});
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('notifyStopTyping');
  });

  socket.on('disconnect', () => {
    console.log("User disconnected");
  });
});

server.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}`));