//------- Define Variables----
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
const port = 3000;
let app = express();
app.set('port', process.env.PORT || 3000);
let server = http.createServer(app);
let io = socketIO(server);


//Server Static files like css,image,browser js
app.use(express.static(publicPath));
let i = 1;
io.on('connection',(socket)=>{
    console.log(`User Connected`);
    
    
    socket.on('createMessage',(msg)=>{
        console.log(msg);
        io.emit('newMessage',{
            from:msg.from,
            text:msg.text,
            createdAt: new Date().getTime()
        });
    });
    socket.on('disconnect',()=>{
        console.log('User was Disconnected');
    });
});



//Start Server Listen On Port 3000

server.listen(port,()=>{
    console.log('Server Start Listen On Port 3000');
})