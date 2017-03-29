'use strict'
var db = require('../modules/database');
var uuid = require('uuid/v1');

exports.chatsGenID = function(){
	return uuid();
};

//create entry
exports.chatsCreateChat = function(chatID){
    var sql = "INSERT INTO chats VALUES('', ?, '', '')";
    return db.pool.query(sql, [chatID]);
};

//create entry
exports.chatsAddUserToChat = function(chatID, userID){
	console.log("SQL");
	var sql = "INSERT INTO chat_users VALUES('', ?, ?)";
	return db.pool.query(sql, [chatID, userID]);
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

//get chat ids by user
exports.chatGetChatsForUser = function(UserID){
	var sql = 'SELECT chat_id FROM chats_users WHERE user_id = ?';
	return db.pool.query(sql, [UserID]);
};
