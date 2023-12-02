const socket = io.connect('https://chat4-r38x.onrender.com/');
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
let news = document.querySelector('.new');
do {
  name = prompt('Please enter your name');
} while (!name);

const append=(message,position)=>{
  const messages=document.createElement('div')
  messages.innerText=message;
  messages.classList.add('message');
  messages.classList.add('position');
  messageArea.append(messages)
}
socket.on('message',data=>{
  append("joined the chat")
})
// Connect to the socket.io server on the client side
 // Replace with your server's URL

textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendMessage(e.target.value);
    document.getElementById('textarea').value = '';
  }
});
document.getElementById('send').addEventListener('click', () => {
  const message = document.getElementById('textarea').value;
  if (message.trim() !== '') {
    sendMessage(message);
    document.getElementById('textarea').value = '';
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim()
  };

  // Append
  appendMessage(msg, 'outgoing');
  scrollToBottom();

  // Send the message to the server
  socket.emit('message', msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement('div');
  let className = type;
  mainDiv.classList.add(className, 'message');

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    <h3></h3>
  `;
  mainDiv.innerHTML = markup;

  messageArea.appendChild(mainDiv);
}

// Receive messages from the server
socket.on('message', (msg) => {
  
  appendMessage(msg, 'incoming');
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
// function updateUserNotification(message) {
//   console.log(message);
//   document.getElementById('joined').innerText = message;
// }

// socket.on('newUser', (message)=>{
// updateUserNotification(message,'help')
// scrollToBottom();
// });
  
