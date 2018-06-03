var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
user = [];
connections  = [];


server.listen(process.env.port || 3000); 
console.log('server running...')
app.get ('/' , function (req, res) {
    res.sendfile(__dirname + '/index.html');

});

    io.sockets.on('connection' , function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected' , connections.length);


    // disconnected 
    socket.on('disconnect', function(data){

        // if(!socket.username)return;
        user.splice(users.indexOf(socket.username),1);
        updateUsernames();

        connections.splice(connections.indexOf(socket),1);
        console.log('Disconnected: %s sockets conneted', connections.length);
    });

    // send message
    socket.on('send message', function(data){
        
        io.sockets.emit('new message',{msg:data, user: socket.username});
    });

    // New User
    socket.on('new user', function(data, callback){
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    })
    function updateUsernames(){
        io.sockets.emit('get users', users);
    }
});