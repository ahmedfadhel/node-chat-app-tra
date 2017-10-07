let socket = io();

socket.on('connect',function (){
    console.log('Connected To Server');

    socket.emit('createMessage',{
        form:'Client Message',
        text:'Message From Client'
    })
});


socket.on('newMessage',function(msg){
    console.log(msg);
})

socket.on('disconnect',function (){
    console.log('Disconnect From Server');
});

