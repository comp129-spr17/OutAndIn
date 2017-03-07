'use strict'
var paths = require('./messaging');

var sockets = function(io) {

	//namespaces
    var globalMessage = globalMessage || [];

    io.on('connection', function(socket){
        console.log("User connected");
        socket.on('message', function(data){
            globalMessage.push({
                user: data.user,
                message: data.message,
                timeStamp: Math.floor(Date.now() / 1000) // UNIX timestamp
            });
            console.log("USER: " + data.user);
            io.emit('message', JSON.stringify(globalMessage));
        });

		//on user initial registration
    	socket.on('userInit', function(data){
			console.log("EVENT: userInit");
			paths.userInit(data, socket);
    	});

		//retrieve user data
		socket.on('userDetails', function(data){
			console.log("EVENT: userDetails");
           	paths.userDetails(data, chatSock);
		});

		socket.on('chatInit', function(data){
			console.log('Event: chat init');
			paths.chatInit(data, socket);
		});

		//retrieve chat data
		socket.on('chatDetails', function(data){
			console.log("EVENT: chatDetails");
           	paths.chatDetails(data, socket);
		});

		//on new message to a chat
		socket.on('messageAdd', function(data){
			console.log("EVENT: addMessage");
           	paths.messageAdd(data, socket);
		});

        socket.on('disconnect', function(){
            console.log("User disconnected");
        });
    });
};

module.exports = sockets;
