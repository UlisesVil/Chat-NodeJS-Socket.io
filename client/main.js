//var socket = io.connect('http://192.168.0.15:6677',{'forceNew':true});
var socket = io.connect('https://ulises-node-chat.herokuapp.com' || 'http://192.168.0.15:6677',{'forceNew':true});
//la direccion l arevisas en el la consola cmd tecleas ipconfig enter y 
//la direccion es la que se indica con Ipv4 y se agrega el 6677 que es 
//el servidor en que estamos corriendo el proyecto



socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html=data.map(function(message, index){
        return (`
            <div class="messenger">
                <div class="textcontainer">
                    <p><strong>${message.nickname}</strong> dice:</p>
                </div>
            </div>
                <div class="textcontainer">
            <div class="message"> 
                    <p>${message.text}</p>
                </div>
            </div>
        `);
    }).join(' ');

    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value,
        

    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);

    
    document.getElementById("text").value= "";
    
    
    return false
}


