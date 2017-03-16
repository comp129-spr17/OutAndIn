/**
 *  @(Project): Apollo Backend
 *  @(Filename): users.js
 *  @(Description): Users route handlers
 *  @(Authors): Out-N-In Team
 *  @(License): MIT
 */

var express = require('express');
var router = express.Router();
var usersService = require('../services/users');
var chatsService = require('../services/chats');

//TEMP User factory
var lastId = 0;
var UserList = [];
var UserIdList = [];
var User = function(name){
	this.id = lastId++;
	this.name = name;
	UserIdList.push(this.id);
	UserList.push(this);
}

router.get('/', function(req, res){
    // Get all users
    /*
    usersService.getAllUsers().then((results) => {
        console.log(results);
        res.send(results);
    }).catch((err) => {
        res.send(err);
    });
    */
    chatsService.chatsCreateRoom().then((res) => {
        console.log(res);
        res.send(results);
    }).catch((err) => {
        res.send(err);
    });
});

//create user
router.get('/init', function(req, res){
	new User(req.query.name);
	var data = {
		header: {
			'object': 'user',
			'action': 'init',
			'code': 0,
			'message': 'success'
		},
		body:{
			'id': UserList[UserList.length - 1].id
		}
	};
	res.send(JSON.stringify(data));
});

//get all user ids
router.get('/list', function(req, res){
	var data = {
		header: {
			'object': 'user',
			'action': 'list',
			'code': 0,
			'message': 'success'
		},
		body: {
			'list': UserIdList
		}
	};
	res.send(JSON.stringify(data));
});

//get user data by id
router.get('/details', function(req, res){

	var data = {
		header: {
			'object': 'user',
			'action': 'details',
			'code': 1,
			'message': 'No user found'
		},
		body: {}
	};

	for(var i = 0; i < UserList.length; i ++)
		if(UserList[i].id == req.query.id)
		{
			data.body.user = UserList[i];
			data.header['code'] = 0;
			data.header['message'] = 'success';
			break;
		}

	res.send(JSON.stringify(data));

});

module.exports = router;
