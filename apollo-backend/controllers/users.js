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

router.post('/', function(req, res){
    console.log("in here");
    console.log("body: " + JSON.stringify(req.body));
    // Create User
    res.json({done: "done"});
});

// Create User Manually
router.get('/setup', function(req, res){
    var username = "apollo";
    var password = "apollo";

    usersService.usersGetUserByUsername(username).then((users) =>{
        // User already exists
        if(users.length != 0){
            return 1;
        }
        // Doesn't exist, create it
        return usersService.usersCreateUser("apollo", "apollo");
    }).then((data) => {
        if(data == 1){
            res.send("User already exists");
            return;
        }
        res.send("User created successfully");
    }).catch((err) => {
        res.send("Error: " + err);
    });
});

//create user
router.post('/create', function(req, res){
	usersService.usersGetUserByUsername(req.body.username).then((users) =>{
        // User already exists
        if(users.length != 0){
            return 1;
        }
        // Doesn't exist, create it
        return usersService.usersCreateUser(req.body.username, '');
    }).then((data) => {
		var response = {
			header: {
				'object': 'user',
				'action': 'create',
				'code': 1,
				'message': 'User already exists'
			},
			body: {
				id: -1
			}
		};
        if(data == 1){
			//return error, user already exists
			res.json(response);
            return;
        }
		return usersService.usersGetUserByUsername(req.body.username);
    }).then((user) =>{
		var response = {
			header: {
				'object': 'user',
				'action': 'create',
				'code': 0,
				'message': 'success'
			},
			body: {
				id:user.uuid
			}
		};
		res.json(response);
	}).catch((err) => {
        res.send("Error: " + err);
    });
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
