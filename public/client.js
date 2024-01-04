const socket = io.connect(' https://havyasam.github.io/chat2/');
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
let news = document.querySelector('.new');
let type=document.getElementById('typing')
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
socket.on('userJoined',(data)=>{
  append("joined the chat")
})

socket.on('typing', (data) => {
  append("typing")
});
socket.on('updateOnlineUsers', (onlineUsers) => {
  console.log('Online users: ', onlineUsers);
 
});
type.addEventListener('keydown', () => {
  // Emit "typing" event when the user starts typing
  socket.emit('typing');
  console.log("helofd")
});


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

  
  appendMessage(msg, 'outgoing');
  scrollToBottom();

  
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


socket.on('message', (msg) => {
  
  appendMessage(msg, 'incoming');
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
