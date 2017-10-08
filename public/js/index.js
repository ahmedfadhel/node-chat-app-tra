let socket = io();
let messageTextbox = $('[name=message]');
socket.on('connect',function (){
    console.log('Connected To Server');

});


socket.on('newMessage',function(msg){
    let messageTime = moment(msg.createdAt).format('h:mm a');
    let li = $('<li></li>');
    li.text(`${msg.from} ${messageTime}: ${msg.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage',function(msg){
    let messageTime = moment(msg.createdAt).format('h:mm a');
    let li = $('<li></li>');
    let a = $('<a target="_blank">My Location </a>');
    
    li.text(`${msg.from} ${messageTime}: `);
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
        messageTextbox.val('');
    });
});



let locationButton = $("#send-location");
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation unsupport in your browser');
    }
    locationButton.attr('disabled','disabled');
    navigator.geolocation.getCurrentPosition(function(postion){
        locationButton.removeAttr('disabled');
        socket.emit('createLocationMessage',{
            lat: postion.coords.latitude,
            long: postion.coords.longitude
        })
    },function(){
        locationButton.removeAttr('disabled');
        alert('Unable to fetch position');
    })
});
socket.on('disconnect',function (){
    console.log('Disconnect From Server');
});

