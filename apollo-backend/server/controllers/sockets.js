var paths = require('./messaging');

var sockets = function(io){
	
	//namespaces
	var userInitNS = io.of('/UserInit');
	userInitNS.on('connection', function(socket){
		console.log('User connected to UserINit');
		socket.on('addUser', function(data){
            //paths.connect(data);
		});
	});
	
    io.on('connection', function(socket){
        console.log("User connected");
        socket.on('disconnect', function(){
            console.log("User disconnected");
        });
    });   
};

module.exports = sockets;
