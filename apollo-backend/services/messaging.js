// Import Database
var db = require('../server/database');

exports.exampleFunction = function(callback){
    var sql = "some statement";
    db.pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(err);
            return;
        }
        connection.query(sql, function(err, results){
            connection.release();
            if(err){
                console.log(err);
                callback(err);
                return;
            }
            callback(false, results);
        });
    });
};

