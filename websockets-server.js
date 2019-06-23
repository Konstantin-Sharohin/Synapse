const WebSocket = require('ws');


const WebSocketServer = WebSocket.Server;
const port = 3001;
const ws = new WebSocketServer({
    port: port
});
const messages = [];

console.log('websockets server started');

ws.on('connection', socket => {
    console.log('client connection established');

    messages.forEach(msg => socket.send(msg));

    socket.on('message', data => {
        console.log('message received: ' + data);
        messages.push(data);
        
        ws.clients.forEach(function (clientSocket) {
            clientSocket.send(data);
            });
        });
});