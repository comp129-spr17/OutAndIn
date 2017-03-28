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
input:
{
	userIDs: []
}
outputs:
{
	chatID: #
}
*/
router.post('/create', function(req, res){

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
		if(chats.length == 0){
			//no chats found
		}
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
