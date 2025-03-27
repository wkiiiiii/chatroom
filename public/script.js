document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  // DOM elements
  const joinForm = document.getElementById('join-form');
  const chatContainer = document.getElementById('chat-container');
  const chatMessages = document.getElementById('chat-messages');
  const usersList = document.getElementById('users-list');
  const userCount = document.getElementById('user-count');
  const chatForm = document.getElementById('chat-form');
  const msgInput = document.getElementById('msg');
  const usernameInput = document.getElementById('username');
  const joinBtn = document.getElementById('join-btn');

  // Join chat when the form is submitted
  joinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    
    if (username) {
      socket.emit('join', username);
      joinForm.classList.add('hidden');
      chatContainer.classList.remove('hidden');
    }
  });

  // Handle Enter key on username input
  usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      joinBtn.click();
    }
  });

  // Send message
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get message text
    const msg = msgInput.value.trim();
    
    if (msg) {
      // Emit message to server
      socket.emit('sendMessage', msg);
      
      // Clear input
      msgInput.value = '';
      msgInput.focus();
    }
  });

  // Message from server
  socket.on('message', (message) => {
    outputMessage(message);
    
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
  
  // Update users list
  socket.on('userList', (users) => {
    updateUsersList(users);
  });

  // Output message to DOM
  function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    
    if (message.user === 'System') {
      div.classList.add('system');
    } else {
      div.classList.add('user');
    }
    
    div.innerHTML = `
      <p class="meta">${message.user === 'System' ? 'System' : `<span>${message.user}</span>`} <span>${getCurrentTime()}</span></p>
      <p class="text">${message.text}</p>
    `;
    
    document.getElementById('chat-messages').appendChild(div);
  }
  
  // Update users list in DOM
  function updateUsersList(users) {
    usersList.innerHTML = '';
    userCount.textContent = users.length;
    
    users.forEach((user) => {
      const li = document.createElement('li');
      li.textContent = user;
      usersList.appendChild(li);
    });
  }
  
  // Get current time
  function getCurrentTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }
}); 