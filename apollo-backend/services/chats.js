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
	var sql = "INSERT INTO chat_users VALUES('', ?, ?)";
	return db.pool.query(sql, [chatID, userID]);
};

//get entry by id
exports.chatsGetChatByID = function(uuid){
	var sql = "SELECT * FROM chats WHERE uuid = ?";
	return db.pool.query(sql, [uuid]);
};

//get entry by id, use to check if user is in chat
exports.chatsGetChatUser = function(chatID, userID){
	var sql = "SELECT * FROM chat_users WHERE chat_id = ? AND user_id = ?";
	return db.pool.query(sql, [chatID, userID]);
};

//get users by chat id
exports.chatsGetUsersForChat = function(ChatID){
	var sql = 'SELECT * FROM chat_users WHERE chat_id = ?';
	return db.pool.query(sql, [ChatID]);
};

//get chat ids by user
exports.chatsGetChatsForUser = function(UserID){
	var sql = 'SELECT chat_id FROM chat_users WHERE user_id = ?';
	return db.pool.query(sql, [UserID]);
};
