const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Store connected users
const users = {};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New user connected');

  // Handle user joining
  socket.on('join', (username) => {
    users[socket.id] = username;
    // Notify all users about the new user
    io.emit('message', {
      user: 'System',
      text: `${username} has joined the chat`
    });
    // Send current users list
    io.emit('userList', Object.values(users));
  });

  // Handle messages
  socket.on('sendMessage', (message) => {
    io.emit('message', {
      user: users[socket.id],
      text: message
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const username = users[socket.id];
    if (username) {
      delete users[socket.id];
      io.emit('message', {
        user: 'System',
        text: `${username} has left the chat`
      });
      // Update users list
      io.emit('userList', Object.values(users));
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 