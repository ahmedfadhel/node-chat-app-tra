let socket = io();

socket.on('connect',function (){
    console.log('Connected To Server');

});


socket.on('newMessage',function(msg){
    console.log(msg);
    let li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage',function(msg){
    let li = $('<li></li>');
    let a = $('<a target="_blank">My Location </a>');
    
    li.text(`${msg.from}: `);
    a.attr('href',msg.url);
    li.append(a);
    $('#messages').append(li);
})
$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text:$('[name=message]').val() 
    },function(){

    });
});

let locationButton = $("#send-location");
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation unsupport in your browser');
    }
    navigator.geolocation.getCurrentPosition(function(postion){
        socket.emit('createLocationMessage',{
            lat: postion.coords.latitude,
            long: postion.coords.longitude
        })
    },function(){
        alert('Unable to fetch position');
    })
});
socket.on('disconnect',function (){
    console.log('Disconnect From Server');
});

