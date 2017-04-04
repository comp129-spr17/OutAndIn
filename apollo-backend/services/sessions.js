var db = require('../modules/database');

exports.storeSessionToken = function(user_uuid, sessionToken){
	var sql = "INSERT INTO user_sessions VALUES ('', ?, ?, UNIX_TIMESTAMP(), UNIX_TIMESTAMP())";
    return db.pool.query(sql, [user_uuid, sessionToken]);
};

exports.getUserIDBySessionToken = function(sessionToken){
	var sql = "SELECT user_id FROM user_sessions WHERE token = ?";
	return db.pool.query(sql, [sessionToken]);
};

