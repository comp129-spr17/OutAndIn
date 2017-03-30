/**
 *  @(Project): Apollo Backend
 *  @(Filename): users.js
 *  @(Description): Users route handlers
 *  @(Authors): Out-N-In Team
 *  @(License): MIT
 */

var express = require('express');
var router = express.Router();
var chatsService = require('../services/chats');
var usersService = require('../services/users');

//?
router.get('/', function(req, res){
    chatsService.chatsCreateChat(chatsService.chatsGenID()).then((res) => {
        console.log(res);
        res.send(results);
    }).catch((err) => {
        res.send(err);
    });
});

//create chat
//NOTE: does not create chat if already EXISTS
/*
output:
{
	chatID: #
}
*/
router.post('/create', function(req, res){
	var chatID = chatsService.chatsGenID();
	chatsService.chatsCreateChat(chatID).then((chat) => {
		console.log("CHAT: " + JSON.stringify(chat));
		res.json({
			header:{
				code: 0,
				message: 'success'
			},
			body: {
				chatID: chatID
			}
		});
	}).catch((err) =>{
		res.json({
			header:{
				code: 1,
				message: 'ERROR: sql'
			},
			body:{
				err : err
			}
		});
	});
});

//get chat details
/*
input:
{
	id: #
}
*/
router.get('/id/:id', function(req, res){
	chatsService.chatsGetChatByID(req.params.id).then((chats) =>{
		if(chats.length == 0){
			//no chats found
			res.json({
				header:{
					code: 1,
					message: 'No chat found'
				},
				body:{
					id : req.params.id
				}
			});
		}else if(chats.length > 1){
			res.json({
				header:{
					code: 2,
					message: 'more than one chat'
				},
				body:{
					chats: chats,
					id : req.params.id
				}
			});
		}else{
			res.json({
				header:{
					code: 0,
					message: 'success'
				},
				body:{
					chat : chats[0]
				}
			});
		}
	}).catch((err) =>{
		res.json({
			header:{
				code: 3,
				message: 'ERROR: sql'
			},
			body:{
				err : err
			}
		});
	});
});

//add user to chat
/*
input:
{
	chatID: #,
	userID: #
}
*/
router.post("/addUser", function(req,res){
	chatsService.chatsGetChatUser(req.body.chatID, req.body.userID).then((chat_user)=>{
		if(chat_user.length == 0){
			//no connection yet
			chatsService.chatsAddUserToChat(req.body.chatID, req.body.userID).then((chat) => {
				res.json({
					header:{
						code: 0,
						message: 'success'
					},
					body: {}
				});
				//TODO: push above ^
				//send socket event
				usersService.usersGetSocketID(req.body.userID).then((sock) => {
					if(res.io.sockets.connected[sock[0]]){
						//fine
						res.io.sockets.connected[sock[0]].emit('chatsListUpdate', {});
					}else{
						res.json({
							header:{
								code: 3,
								message: 'ERROR: socket not connected'
							},
							body:{
								err : err
							}
						});
					}
				}).catch((err) =>{
					res.json({
						header:{
							code: 2,
							message: 'ERROR: sql, could not get socket id'
						},
						body:{
							err : err
						}
					});
				});

			}).catch((err) =>{
				res.json({
					header:{
						code: 1,
						message: 'ERROR: sql could not make entry'
					},
					body:{
						err : err
					}
				});
			});
		}else{
			//connection already exists
			res.json({
				header:{
					code: 4,
					message: 'ERROR: user already in chat'
				},
				body:{}
			});
		}
	}).catch((err) => {
		res.json({
			header:{
				code: 1,
				message: 'ERROR: sql'
			},
			body: {}
		});
	});
});

//get all chat ids by user id
router.get('/byUser/:id', function(req, res){
	chatsService.chatsGetChatsForUser(req.params.id).then((chatIDs) =>{
		console.log("chat:" + JSON.stringify(chatIDs));
		res.json({
			header:{
				code: 0,
				message: 'success'
			},
			body:{
				chatIDs : chatIDs
			}
		});
	}).catch((err) =>{
		res.json({
			header:{
				code: 1,
				message: 'ERROR: sql'
			},
			body:{
				err : err
			}
		});
	});
});

//get messages for one chat
/*
input:
{
	chatID: #
},
output:
{
	messages: []
}
*/
router.get('/messages/:id', function(req, res){
	chatsService.chatsGetMessagesForChat(req.params.id).then((msg) =>{
		if(msg.length == 0){
			//no messages found
			res.json({
				header:{
					code: 2,
					message: 'No messages for chat'
				},
				body:{
					messages: msg
				}
			});
		}else{
			//fine
			res.json({
				header:{
					code: 0,
					message: 'success'
				},
				body:{
					messages: msg
				}
			});
		}
	}).catch((err) =>{
		res.json({
			header:{
				code: 1,
				message: 'ERROR: sql'
			},
			body:{
				err : err
			}
		});
	});
});

//add message to chat
/*
input:
{
	chatID: #,
	userID: #,
	messageText: ''
}
*/
router.post('/messages', function(req, res){
	chatsService.chatsAddMessageToChat(req.body.chatID,req.body.userID,req.body.messageText).then((msg) => {
		res.json({
			header:{
				code: 0,
				message: 'success'
			},
			body:{}
		});
	}).catch((err) =>{
		res.json({
			header:{
				code: 1,
				message: 'ERROR: sql'
			},
			body:{
				err : err
			}
		});
	});
});

module.exports = router;
