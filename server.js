const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);


app.use(express.static(__dirname + '/public'));
app.use('/public',express.static(__dirname +'/public'));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.broadcast.emit('userJoined', { username: 'New User' });
 
  socket.on('message', (msg) => {
    socket.broadcast.emit('message',msg)
    
    
  })
  socket.on('typing', () => {
   
    socket.broadcast.emit('typing', { username: 'new user' });
    
      
    });
  });


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});