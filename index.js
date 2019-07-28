const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.set('views', path.resolve(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

io.sockets.on('connection', socket => {
    socket.on('set_username', data => {
        socket.username = data.username || 'Anonymous';
        io.emit('is_online', `🔵<i>${socket.username} has joined the chat...</i>`);
    });

    socket.on('typing', () => {
        io.emit('is_typing', `✎<i>${socket.username} is typing...</i>`);
    });

    socket.on('disconnect', () => {
        io.emit('is_online', `🔴<i>${socket.username} has left the chat...</i>`);
    });

    socket.on('chat_message', message => {
        io.emit('chat_message', `<strong>${socket.username}</strong>: ${message}`);
    });

});

const port = process.env.PORT || 3000;
const server = http.listen(port, () => {
    console.log(`listening on port: ${port}`);
});