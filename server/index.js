var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res){
    res.status(200).send('Hola mundo desde una ruta');
});


var messages =[{
    id: 1,
    text: 'Welcome to my Chat with Socket.io and NodeJS have some fun...',
    nickname: 'Ulises Villa'
}];

io.on('connection', function(socket){
    console.log("El nodo con IP: "+socket.handshake.address+"se ha conectado...");

    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);
        
        io.sockets.emit('messages', messages);
    });
});

server.listen(process.env.PORT || 6677, function(){
    //console.log('Servidor esta funcionando en http://localhost:6677');
    console.log('Servidor esta funcionando en https://fathomless-hollows-97343.herokuapp.com' + server.address().port);
});