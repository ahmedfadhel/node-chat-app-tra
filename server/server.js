//------- Define Variables----
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
//-------------Local Virables----------------

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validator');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname,'../public');
const port = 3000;
let app = express();
app.set('port', process.env.PORT || 3000);
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

//Server Static files like css,image,browser js
app.use(express.static(publicPath));
let i = 1;


//Emit Listen Handler on connect Event
io.on('connection',(socket)=>{
    console.log(`User Connected`);

    
    socket.on('join',(params,callback)=>{
        
        if(!isRealString(params.name) || !isRealString(params.room)){
            
            return callback('vaild Name and Room are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        //Send Greeting Message to every one join any room
        socket.emit('newMessage',generateMessage('Admin','Welcome In Chat Room'));
        
        //Send Notification that new User Joined
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} User Joined`));
       
        callback();


    


    })


    socket.on('createMessage',(msg,callback)=>{
        console.log(msg);
        io.emit('newMessage',generateMessage(msg.from,msg.text));
        callback();
    });

    socket.on('createLocationMessage',(msg)=>{
        // socket.broadcast.emit('newMessage',generateMessage('Admin',`${msg.lat},${msg.long}`));
        io.emit('newLocationMessage',generateLocationMessage('Admin',msg.lat,msg.long));
    });

    
    //Emit Event Liston on disconnect Event
    socket.on('disconnect',()=>{
        // console.log('User was Disconnected');
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the room.`))
        }
    });
});



//Start Server Listen On Port 3000

server.listen(port,()=>{
    console.log('Server Start Listen On Port 3000');
})