'use strict'
var db = require('../modules/database');
var uuid = require('uuid/v1');

//create entry
exports.chatsCreateChat = function(){
    let room_id = uuid();
    var sql = "INSERT INTO chats VALUES('', ?, '', '')";
    return db.pool.query(sql, [room_id]);
};

//get entry by id
exports.chatsGetChatByID = function(ChatID){
	var sql = 'SELECT * FROM chats WHERE chat_id = ?';
	return db.pool.query(sql, [ChatID]);
};

//get users by chat id
exports.chatGetChatUser = function(ChatID){
	var sql = 'SELECT * FROM chat_users WHERE chat_id = ?';
	return db.pool.query(sql, [ChatID]);
};
