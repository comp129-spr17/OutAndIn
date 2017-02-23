var mysql = require('promise-mysql');
var fs = require('fs');
var Promise = require('bluebird');

// Temporary MySQL connection to initalize the database
var tmpConnection;
// Permenant MySQL connection pool
var pool;
// Database name
var databaseName = "apollo"; 

function sleep(time) {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
}

function checkIfDatabaseExists(){
    return tmpConnection.getConnection().then((connection) => {
        var sql = "SHOW DATABASES";
        return connection.query(sql);
    }).then((results) => {
        // Check if any databases exists
        if(results.length == 0) {
            return false;
        }
        // Check if apollo database exists
        for(result in results){
            if(results[result]['Database'] == databaseName){
                return true; 
            }
        }
        return false;
    });
}

function dropDatabase(){
    return tmpConnection.getConnection().then((connection) => {
        var sql = "DROP DATABASE " + databaseName;
        return connection.query(sql);
    }).then((results) => {
        console.log("DATABASE: Database '" + databaseName + "' dropped successfully");
        return;
    }).catch((err) => {
        console.log(err); 
    });
}

function createDatabase(){
    tmpConnection.getConnection().then((connection) => {
        var sql = "CREATE DATABASE " + databaseName + " CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
        return connection.query(sql);
    }).then((results) => {
        console.log("DATABASE: Created the '" + databaseName + "' database");
    }).catch((err) => {
        console.log(err);
    });
}

function createTables(sqlDumpFilePath){
    setTimeout(() => {
        var importer = require('node-mysql-importer');
        var myCon = importer.config({
            host: 'localhost',
            user: 'root',
            password: 'apollo',
            database: 'apollo'
        });
        importer.importSQL('./database/apollo-database.sql').then(() => {
            console.log("all statement executed"); 
        }).catch((err) => {
            console.log(err) 
        });
    }, 2000);
}

var init = function(){
    // Create temporary mysql connection
    tmpConnection = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'apollo', // running locally, no security concerns here
        connectionLimit: 200,
        supportBigNumbers: true
    });
    
    // Check if 'apollo' database exists
    checkIfDatabaseExists().then((exists) => {
        if(exists) {
            console.log("DATABASE: Database '" + databaseName + "' exists");
            return dropDatabase();
        }
        console.log("DATABASE: Database '" + databaseName + "' does not exists");
    }).then(() => {
        return createDatabase(); 
    }).then(() => {
        return; 
    }).catch((err) => {
        console.log(err); 
    }).finally(() => {
        // Create 'apollo' database tables
        var sqlDumpFilePath = './database/apollo-database.sql';
        createTables(sqlDumpFilePath);
        // Create pool of mysql connections
        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'apollo', // running locally, no security concerns here
            database: 'apollo',
            connectionLimit: 200,
            supportBigNumbers: true
        });
    });
};

exports.init = init;
exports.pool = pool;
