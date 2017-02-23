var exec = require('child_process').exec;
var child1 = exec('mysql --user="root" --password="apollo" --execute="DROP DATABASE apollo"');
var child2 = exec('mysql --user="root" --password="apollo" --execute="CREATE DATABASE IF NOT EXISTS apollo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"');
var child3 = exec('mysql --user="root" --password="apollo" apollo < ./database/apollo-database.sql'); 

child1.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
    child1.exec('apollo');
});
child1.stderr.on('data', function(data) {
    console.log('stdout: ' + data);
});
child1.on('close', function(code) {
    console.log('closing code: ' + code);
});

child2.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
});
child2.stderr.on('data', function(data) {
    console.log('stdout: ' + data);
});
child2.on('close', function(code) {
    console.log('closing code: ' + code);
});

child3.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
});
child3.stderr.on('data', function(data) {
    console.log('stdout: ' + data);
});
child3.on('close', function(code) {
    console.log('closing code: ' + code);
});

