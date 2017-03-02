var paths = require('./messaging');

var sockets = function(io) {
	
	//namespaces
	var chatSocket = io.of('/Chat');
    var globalMessage = globalMessage || [];

    io.on('connection', function(socket){
        console.log("User connected");
        socket.on('message', function(data){
            globalMessage.push({
                user: data.user,
                message: data.message,
                timeStamp: Math.floor(Date.now() / 1000) // UNIX timestamp
            });
            io.emit('message', JSON.stringify(globalMessage));
        });

		socket.on('addUser', function(data){
			console.log("EVENT: addUser");
           	paths.User.add(data, chatSock); 
		});

		socket.on('getUser', function(data){
			console.log("EVENT: getUser");
           	//paths.User.get(data, chatSock, socket.id);
		});	

		socket.on('addChat', function(data){
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
