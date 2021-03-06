var express = require('express');
var socket = require('socket.io');
var math = require ('mathjs')

var app = express();


server = app.listen(5000, function() {
    console.log('Servidor corriendo en el puerto 5000')
});

io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data) {
        try {
            io.emit('RECEIVE_MESSAGE', math.eval(data.value));
          }
          catch(err) {
            io.emit('RECEIVE_MESSAGE', math.eval(0));
            alert(err)
          }
        
    })
});

