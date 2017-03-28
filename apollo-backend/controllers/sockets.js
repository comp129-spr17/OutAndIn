'use strict'
var paths = require('./messaging');
var usersService = require('../services/users');

var sockets = function(io) {

	//namespaces
    var globalMessage = globalMessage || [];

    io.on('connection', function(socket){
        console.log("User connected: " + socket.id);

		//store socket id of this user
		socket.on("usersStoreSocketID", function(data){
			console.log("EVENT: usersStoreSocketID");
			usersService.usersStoreSocketID(data.user, socket.id).then((res) => {
				console.log("Stored: " + socket.id);
				socket.emit("usersStoreSocketID",{
					code: 0
				});
			}).catch((err) => {
				console.log("ERROR");
				socket.emit("usersStoreSocketID", {
					code: 1,
					err: err
				});
			});
		});

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
		//TODO: AJAX
    	socket.on('userInit', function(data){
			console.log("EVENT: userInit");
			paths.userInit(data, socket);
    	});

		//retrieve list of user ids
		//TODO: AJAX
		socket.on('userIDList', function(data){
			console.log("EVENT: User Lists");
			paths.userIDList(data, socket);
		});

		//retrieve user data
		//TODO: AJAX
		socket.on('userDetails', function(data){
			console.log("EVENT: userDetails");
           	paths.userDetails(data, socket);
		});

		//TODO: make io room
		socket.on('chatInit', function(data){
			console.log('Event: chat init');
			paths.chatInit(data, socket, io);
		});

		//retrieve chat data
		socket.on('chatDetails', function(data){
			console.log("EVENT: chatDetails");
           	paths.chatDetails(data, socket);
		});

		//on new message to a chat
		socket.on('messageAdd', function(data){
			console.log("EVENT: addMessage");
           	paths.messageAdd(data, socket, io);
		});

        socket.on('disconnect', function(){
            console.log("User disconnected");
        });
    });
};

module.exports = sockets;
