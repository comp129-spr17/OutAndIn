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
			paths.userInit(data, socket);
    	});

		//Add a user to an exsiting chat
		//TODO: Later print
        socket.on('userAddChat', function(data){

		});

		//retrieve user data
		socket.on('userDetails', function(data){
			console.log("EVENT: getUser");
           	paths.userDetails(data, chatSock);
		});

		//retrieve chat data
		socket.on('chatDetails', function(data){
			console.log("EVENT: getChat");
           	//paths.Chat.get(data, chatSock);
		});

		//on new message to a chat
		socket.on('messageSend', function(data){
			console.log("EVENT: addMessage");
           	//paths.Chat.addMessage(data, chatSock);
		});

        socket.on('disconnect', function(){
            console.log("User disconnected");
        });
    });
};

module.exports = sockets;
