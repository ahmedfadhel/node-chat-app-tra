//------- Define Variables----
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
//-------------Local Virables----------------

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = 3000;
let app = express();
app.set('port', process.env.PORT || 3000);
let server = http.createServer(app);
let io = socketIO(server);


//Server Static files like css,image,browser js
app.use(express.static(publicPath));
let i = 1;


//Emit Listen Handler on connect Event
io.on('connection',(socket)=>{
    console.log(`User Connected`);

    socket.emit('newMessage',generateMessage('Admin','Welcome In Chat Room'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));
    socket.on('createMessage',(msg,callback)=>{
        console.log(msg);
        socket.broadcast.emit('newMessage',generateMessage(msg.from,msg.text));
        callback();
    });

    //Emit Event Liston on disconnect Event
    socket.on('disconnect',()=>{
        console.log('User was Disconnected');
    });
});



//Start Server Listen On Port 3000

server.listen(port,()=>{
    console.log('Server Start Listen On Port 3000');
})