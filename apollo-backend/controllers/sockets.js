var sockets = function(io){
    console.log("yo in sockets");
    io.on('connection', function(socket){
        console.log("User connected");
        socket.on('disconnect', function(){
            console.log("User disconnected");
        });
    });   
};

module.exports = sockets;
