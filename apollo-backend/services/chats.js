'use strict'
/**
 * GetUserByUsername
 * @description: Get the user by the username
 * @param: {string} username - Username of the user
 * @return: {promise} promise - SQL promise
 */

var db = require('../modules/database');
var uuid = require('uuid/v4');

//create entry
exports.createChat = function(userID, chatID){
    var sql = "INSERT INTO chats VALUES('', ?, ?, 0, '', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP())";
    return db.pool.query(sql, [chatID, userID]);
};

//create entry
exports.addUserToChat = function(userID, chatID){
	var sql = "INSERT INTO chat_users VALUES('', ?, ?)";
	return db.pool.query(sql, [chatID, userID]);
};

//get entry by id
exports.getChatByUUID = function(uuid){
	var sql = "SELECT uuid, creator_id, group_chat, name, avatar FROM chats WHERE uuid = ?";
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
	return db.pool.query(sql, [chatID]);
};

// set chat status
exports.setChatStatus = function(chatID){
	var state = 0;
	var sql = "INSERT INTO chat_status VALUES('', ?, ?, UNIX_TIMESTAMP(), UNIX_TIMESTAMP())";
	return db.pool.query(sql, [chatID, state]);
};

//get chat ids by user
exports.getChatsForUser = function(userID){
	var sql = "SELECT chats.uuid, chats.name, chats.avatar, chats.creator_id, chat_status.state, chats.created_at, chats.updated_at FROM chats, chat_users, chat_status WHERE chat_users.user_id = ? and chat_users.chat_id = chats.uuid and chat_status.chat_id = chat_users.chat_id"
	return db.pool.query(sql, [userID]);
};

//get chat ids by user
exports.getLimitedChatsForUser = function(userID){
	var sql = "SELECT chats.uuid, chats.creator_id FROM chats, chat_users WHERE chat_users.user_id = ? and chat_users.chat_id = chats.uuid"
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
