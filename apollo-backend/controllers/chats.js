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

//?
router.get('/', function(req, res){
    chatsService.chatsCreateChat().then((res) => {
        console.log(res);
        res.send(results);
    }).catch((err) => {
        res.send(err);
    });
});

//create chat
//NOTE: does not create chat if already EXISTS
/*
*/
router.post('/create', function(req, res){
	chatsService.chatsCreateChat().then((chat) => {
		res.json({
			header:{
				code: 0,
				message: 'success'
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

//add user to chat
/*
input:
{
	chatID: #,
	userID: #
}
*/
router.post("/addUser", function(req,res){
	chatsService.chatsAddUserToChat(req.body.chatID. req.body.userID).then((chat_user) =>{
		res.json({
			header:{
				code: 0,
				message: 'success'
			}
		}).catch((err) =>{
			res.json({
				header:{
					code: 1,
					message: 'ERROR: sql'
				},
				body:{
					err: err
				}
			});
		});
	});
});

//get chat details
/*
input:
{
	user1: #,
	user2: #
}
*/
router.get('/id/:id', function(req, res){
	chatsService.chatsGetChatByID(req.params.id).then((chats) =>{
		if(!chats.length){
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

//get all chat ids by user id
router.get('/byUser/:id', function(req, res){
	chatsService.chatGetChatsForUser(req.params.id).then((chatIDs) =>{
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

});

//add message to chat
router.post('/messages/:id', function(req, res){

});

module.exports = router;
