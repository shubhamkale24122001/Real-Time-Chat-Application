const socket= io('http://localhost:8000');

const form= document.getElementById('send-container');
const messageInp= document.getElementById('messageInp');
const messageContainer= document.querySelector('.container');
var audio= new Audio('audio/ding.mp3');//to play audio

const append= (message, position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit'/*Listens to the event that form is submited*/, (e)=>{
    e.preventDefault(); //prevents reload of page
    const message= messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value='';//when messsage is send make the input of form blank
});

const name= prompt("Enter your name to join");
socket.emit('new-user-joined'/*this must be same as in our index.js made to build server*/, name);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'left');
});

socket.on('recieve', data =>{
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('leave', name =>{
    append(`${name} left the chat`, 'left');
});