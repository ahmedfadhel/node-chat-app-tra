let socket = io();
let messageTextbox = $('[name=message]');
socket.on('connect',function (){
    // console.log('Connected To Server');

    let params = jQuery.deparam(window.location.search);

    socket.emit('join',params,function (err){
        if(err){
            alert(err);
            window.location.href='/';
        }else{
            console.log('No Error');
        }
    });


});

function scrollToBottom(){
 //Selectors
 let messages = $('#messages');
 let newMessage = messages.children('li:last-child');
 
 //Hieghts
 let clientHeight = messages.prop('clientHeight');
 let scrollTop = messages.prop('scrollTop');
 let scrollHeight = messages.prop('scrollHeight');
 let newMessageHeight = newMessage.innerHeight();
 let lastMessageHeight = newMessage.prev().innerHeight();


 if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight); 
 }
}

socket.on('newMessage',function(msg){
    let messageTime = moment(msg.createdAt).format('h:mm a');
    let template = $('#message-template').html();
    let html = Mustache.render(template,{
        text: msg.text,
        from:msg.from,
        createdAt:messageTime
    });
    $('#messages').append(html);
    scrollToBottom();
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
    scrollToBottom();
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


socket.on('updateUserList',function(users){
    let ol = $('<ol></ol>');

    users.forEach(function(element) {
        ol.append($('<li></li>').text(element));
    });

    $('#users').html(ol);
})

