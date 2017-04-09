'use strict'
/**
 * GetUserByUsername
 * @description: Get the user by the username
 * @param: {string} username - Username of the user
 * @return: {promise} promise - SQL promise
 */

var db = require('../modules/database');
var uuid = require('uuid/v1');

/**
 * GenerateChatID
 * @description: Get the user by the username
 * @param: {string} username - Username of the user
 * @return: {promise} promise - SQL promise
 */
exports.generateChatID = function(){
	return uuid();
};

//create entry
exports.createChat = function(chatID, userID){
    var sql = "INSERT INTO chats VALUES('', ?, ?, '', '', '', '')";
    return db.pool.query(sql, [chatID, userID]);
};

//create entry
exports.addUserToChat = function(chatID, userID){
	var sql = "INSERT INTO chat_users VALUES('', ?, ?)";
	return db.pool.query(sql, [chatID, userID]);
};

//get entry by id
exports.getChatByUUID = function(uuid){
	var sql = "SELECT * FROM chats WHERE uuid = ?";
	return db.pool.query(sql, [uuid]);
};

exports.getChatStatus = function(chatID){
	var sql = "SELECT * FROM chat_status WHERE chat_id = ?";
	return db.pool.query(sql, [chatID]);
};

//get entry by id, use to check if user is in chat
exports.getUserFromChat = function(chatID, userID){
	var sql = "SELECT * FROM chat_users WHERE chat_id = ? AND user_id = ?";
	return db.pool.query(sql, [chatID, userID]);
};

//get users by chat id
exports.chatsGetUsersForChat = function(chatID){
	var sql = 'SELECT * FROM chat_users WHERE chat_id = ?';
	return db.pool.query(sql, [ChatID]);
};

//get chat ids by user
exports.getChatsForUser = function(userID){
	var sql = "SELECT chats.uuid, chats.name, chats.avatar, chats.creator_id, chat_status.state, chats.created_at, chats.updated_at FROM chats, chat_users, chat_status WHERE chat_users.user_id = ? and chat_users.chat_id = chats.uuid and chat_status.chat_id = chat_users.chat_id"
	return db.pool.query(sql, [userID]);
};

//add message for chat
exports.chatsAddMessageToChat = function(ChatID, UserID, msgText){
	var sql = "INSERT INTO messages VALUES('', ?, ?, ?, ?)";
	return db.pool.query(sql, [ChatID, UserID, msgText, Math.floor(Date.now()/ 1000)]);
};

//get messages [] for chat
exports.chatsGetMessagesForChat = function(ChatID){
	console.log("CHATID: " + ChatID);
	var sql = "SELECT * FROM messages WHERE chat_id = ?";
	return db.pool.query(sql, [ChatID]);
};

exports.getUsersFromChat = function(chatID){
	var sql = "SELECT users.uuid, users.username FROM users, chat_users WHERE chat_users.chat_id = ? AND chat_users.user_id = users.uuid";
	return db.pool.query(sql, [chatID]);
};
