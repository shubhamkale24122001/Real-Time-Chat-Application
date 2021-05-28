//node server which will handle socket io connections

const io= require('socket.io')(8000 /*port we ant to use*/, {
    cors: {//this part is very impoortant
      origin: '*',
    }
  });

const users={};

io.on('connection' /*this event is fired when someone connects to socket */, socket =>{ // io.on is socket.io instance which will listen to socket connections, like when somene joins or someone sends a message
    socket.on('new-user-joined'/*we can keep this event name anything*/ , name =>{// when a perticualar connection is made, what will happen to that perticular connection is habdled by socket.on
        // console.log("New user:",name);
        users[socket.id]= name; //whenever user-joined event happens then, the users object we defined above give it id equal to name
        // NOTE: every socket connection has unique id, we are using that here by calling socket.id
        socket.broadcast.emit('user-joined' /*we an keep this event name anything*/ , name); //whenever new user joins broadcast message that new user has joined and his name to all the existing users
        //NOTE: .emit emits the event and .on recieves the emitted event
    }); 

    socket.on('send', message =>{
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]});
    });

    socket.on('disconnect', message=>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    })
});
