var paths = require('./messaging');
var usersService = require('../services/users');

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

        socket.on('userInit', function(data){
            usersService.usersGetUserByUsername(data["details"]["username"]).then((res) => {
                if(res.length == 0) {
                    return usersService.usersCreateUser(data["details"]["username"]);             
                }
                // Username already exists
                throw 0;
            }).then((res) => {
                let response = {
                    "object": "USER",
                    "action": "INIT",
                    "code": "1",
                    "message": "Username acquired successfully",
                    "details": {
                        username: data["details"]["username"]
                    }
                };
                socket.emit('userInit', JSON.stringify(response));
            }).catch((err) => {
                if(err == 0){
                    let response = {
                        "object": "USER",
                        "action": "INIT",
                        "code": "0",
                        "message": "Username is already taken",
                        "details": {}
                    };
                    socket.emit('userInitError', JSON.stringify(response));    
                    return;
                }
                let response = {
                    "object": "USER",
                    "action": "INIT",
                    "code": "2",
                    "message": "Database Error",
                    "details": {}
                };
                socket.emit('userInitError', JSON.stringify(response));           
            });   
        });

        socket.on('addUser', function(data){
            
			console.log("EVENT: addUser");
           	paths.User.add(data, socket); 
		});

		socket.on('getUser', function(data){
			console.log("EVENT: getUser");
           	//paths.User.get(data, chatSock, socket.id);
		});	

        socket.on('joinChat', function(data){
            // check if chat is already established between those two users
            // return that chat if there is
            // if not, make new chat
			console.log("EVENT: addChat");
           	//paths.Chat.add(data, chatSock);
		});

		socket.on('getChat', function(data){
			console.log("EVENT: getChat");
           	//paths.Chat.get(data, chatSock, socket.id);
		});

		socket.on('addMessage', function(data){
			console.log("EVENT: addMessage");
           	//paths.Chat.addMessage(data, chatSock);
		});

        socket.on('disconnect', function(){
            console.log("User disconnected");
        });
    });   
};

module.exports = sockets;
