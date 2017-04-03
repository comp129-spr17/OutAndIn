var fs = require('fs');
var net = require('net');
var Promise = require('bluebird');
var client = require('scp2');
var nodemiral = require('nodemiral');
var Client = require('ssh2');

function checkConnection(host, port, timeout) {
    return new Promise(function(resolve, reject) {
        timeout = timeout || 5000;     // default of 10 seconds
        var timer = setTimeout(function() {
            reject("timeout");
            socket.end();
        }, timeout);
        var socket = net.createConnection(port, host, function() {
            clearTimeout(timer);
            resolve();
            socket.end();
        });
        socket.on('error', function(err) {
            clearTimeout(timer);
            reject(err);
        });
    });
}
var init = function(){
	// Check if the remote server is reachable
    checkConnection("172.31.254.33", 22).then(function() {
        // Check if config.json exists    
        if(!fs.existsSync('./config/config.json')){
            console.log("You do not have a config file 'config.json' in your config directory");
            console.log("Please create one tailored to your specific settings");
            process.exit(1);
        }
        // Import config file
        config = require('./config/config.json');
        // Config file properties
        var props = [
            "APOLLO_MYSQL_PORT",
            "APOLLO_MYSQL_DIR",
            "APOLLO_MYSQL_IP",
            "APOLLO_MYSQL_SRV_USER",
            "APOLLO_MYSQL_SRV_PASS",
            "APOLLO_MYSQL_USER",        
            "APOLLO_MYSQL_PASS"
        ];
        // Check if config properties are missing 
        var missing = [];
        for(prop in props){
            if(!config.hasOwnProperty(props[prop])){
                missing.push(props[prop]); 
            }
        }
        if(missing.length > 0) {
            console.log("You are missing the following properties in your config 'config.json' file");
            for(prop in missing){
                console.log(props[prop]); 
            }
            process.exit(1);
        }
        // Set environment variables from the config file
        for(prop in props){
            process.env[props[prop]] = config[props[prop]];    
        }
        // Check if apollo sql dump exists
        if(!fs.existsSync('./database/apollo.sql')){
            console.log("You do not have the apollo.sql sql dump file");
            process.exit(1); 
        }
        // Try and upload the local mysql dump to the server
        return new Promise((resolve, reject) => {
            client.scp('./database/apollo.sql', {
                host: String(process.env['APOLLO_MYSQL_IP']),
                username: String(process.env['APOLLO_MYSQL_SRV_USER']),
                password: String(process.env['APOLLO_MYSQL_SRV_PASS']),
                path: String('/root/apollo-mysql-dirs/' + String(process.env['APOLLO_MYSQL_DIR']))
            },(err) => {
                if(err !== null)
                    reject(err);
            });
            resolve();
        });
    }).then(() => {
        var hostname = String(process.env['APOLLO_MYSQL_IP']);
        var user = String(process.env['APOLLO_MYSQL_SRV_USER']);
        var pass = String(process.env['APOLLO_MYSQL_SRV_PASS']);
		var path = String('/root/apollo-mysql-dirs/' + String(process.env['APOLLO_MYSQL_DIR']) + '/');
        var command1 = String(path + 'stop_db.sh');
        var command2 = String(path + 'start_db.sh');
        var conn1 = new Client();
        var conn2 = new Client();
        conn1.on('ready', function() {
            console.log('Stopping Remote MySQL Server');
            conn1.exec(command1, function(err, stream) {
                if (err) throw err;
                stream.on('close', function(code, signal) {
                    //console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                    conn1.end();
                }).on('data', function(data) {
                    //console.log('STDOUT: ' + data);
                }).stderr.on('data', function(data) {
                    console.log('STDERR: ' + data);
                });
            });
        }).connect({
            host: hostname,
            port: 22,
            username: user,
            password: pass
        });
        setTimeout(() => {
            conn2.on('ready', function() {
                console.log('Starting Remote MySQL Server');
                conn2.exec(command2, function(err, stream) {
                    if (err) throw err;
                    stream.on('close', function(code, signal) {
                        //console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                        conn2.end();
                    }).on('data', function(data) {
                        //console.log('STDOUT: ' + data);
                    }).stderr.on('data', function(data) {
                        console.log('STDERR: ' + data);
                    });
                });
            }).connect({
                host: hostname,
                port: 22,
                username: user,
                password: pass
            });
        }, 5000);
    }).then((res) => {
        console.log("NOW STARTING BACKEND SERVER");
    }).catch((err) => {
        console.log("The MySQL server is not reachable");
        console.log("Are you connected to the VPN server?");
        console.log("Error: " + err);
        process.exit(1);
    });
};

exports.init = init;
