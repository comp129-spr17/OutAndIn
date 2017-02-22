var mysql = require('mysql');
var exec = require('child_process').exec;

var init = function(){
    exec("docker run --name apollo-mysql -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=apollo centurylink/mysql", function(error, stdout, stderr) {
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
        if(process.platform === "win32") {
            exec('set DID=docker ps -aqf "name=apollo-mysql" && docker stop $Env:DID && docker rm $Env:DID', function(error, stdout, stderr) {
                if(error)
                    console.error("Error: " + error);
                if(stdout)
                    console.error("Stdout: " + stdout);
                if(stderr)
                    console.error("stderr: " + stderr);
                console.error("Stopping MySQL Docker Container");
            }); 
            process.exit();
            return;
        }
        //graceful shutdown
        exec('DID=`docker ps -aqf "name=apollo-mysql"` && docker stop $DID && docker rm $DID', function(error, stdout, stderr) {
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
