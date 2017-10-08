let socket = io();
let messageTextbox = $('[name=message]');
socket.on('connect',function (){
    console.log('Connected To Server');

});


socket.on('newMessage',function(msg){
    let messageTime = moment(msg.createdAt).format('h:mm a');
    let template = $('#message-template').html();
    let html = Mustache.render(template,{
        text: msg.text,
        from:msg.from,
        createdAt:messageTime
    });
    $('#messages').append(html);
});

socket.on('newLocationMessage',function(msg){
    let messageTime = moment(msg.createdAt).format('h:mm a');
    let locationTemplate = $('#locationmessage-template').html();
    let html = Mustache.render(locationTemplate,{
        from:msg.from,
        url:msg.url,
        createdAt: messageTime
    });
 
    $('#messages').append(html);
    // let li = $('<li></li>');
    // let a = $('<a target="_blank">My Location </a>');
    
    // li.text(`${msg.from} ${messageTime}: `);
    // a.attr('href',msg.url);
    // li.append(a);
    
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

