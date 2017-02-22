var mysql = require('mysql');
var exec = require('child_process').execFile;

var init = function(){
    exec("./database/start_db.sh", null, null, function(error, stdout, stderr) {
        if(error)
            console.error("Error: " + error);
        if(stdout)
            //console.error("Stdout: " + stdout);
        if(stderr)
            console.error("stderr: " + stderr);
        console.log("Starting MySQL Docker Container");
    });
    if (process.platform === "win32") {
        var rl = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on("SIGINT", function () {
            process.emit("SIGINT");
        });
    }
    process.on("SIGINT", function () {
        //graceful shutdown
        exec("./database/stop_db.sh", null, null, function(error, stdout, stderr) {
            if(error)
                console.error("Error: " + error);
            if(stdout)
                console.error("Stdout: " + stdout);
            if(stderr)
                console.error("stderr: " + stderr);
            console.error("Stopping MySQL Docker Container");
        });
        process.exit();
    });
};

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'username',
    database: 'dbName',
    connectionLimit: 200,
    supportBigNumbers: true,
});

exports.init = init;
exports.pool = pool;
