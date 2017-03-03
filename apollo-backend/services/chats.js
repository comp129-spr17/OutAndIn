var db = require('../modules/database');
var uuid = require('uuid/v1');

exports.chatsCreateRoom = function(){
    let room_id = uuid(); 
    var sql = "INSERT INTO chat VALUES('', ?, '', '')";
    return db.pool.query(sql, [room_id]);
};
