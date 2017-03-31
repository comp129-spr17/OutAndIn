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
    usersService.usersGetUserIDList().then((users) => {
		res.json({
			header: {
				'object': 'user',
				'action': 'list',
				'code': 0,
				'message': 'success'
			},
			body: {
				list:users
			}
		});
	}).catch((err) => {
		res.json({
			header: {
				'object': 'user',
				'action': 'list',
				'code': 1,
				'message': 'error'
			},
			body: {
				error: err
			}
		});
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
        if(data == 1){
			//return error, user already exists
            return 1;
        }
		return usersService.usersGetUserByUsername(req.body.username);
    }).then((users) =>{
        console.log("Users: " + JSON.stringify(users));
        if(users == 1) {
            //return error, user already exists
			res.json({
				header: {
					'object': 'user',
					'action': 'create',
					'code': 1,
					'message': 'User already exists'
				},
				body: {
					id: -1
				}
			});
            return;
        }
		var response = {
			header: {
				'object': 'user',
				'action': 'create',
				'code': 0,
				'message': 'success'
			},
			body: {
				id: users[0].uuid
			}
        };
        res.io.sockets.emit('usersConnected', {});
		res.json(response);
    }).catch((err) => {
		res.json({
			header: {
				'object': 'user',
				'action': 'create',
				'code': 2,
				'message': 'error'
			},
			body: {
				error: err
			}
		});
    });
});

router.get('/test', function(req, res){
    usersService.usersGetUserByUsername("apollo").then((data) => {
        console.log(data);
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    });
});

//get all user ids
router.get('/list', function(req, res){
	usersService.usersGetUserIDList().then((users) => {
		res.json({
			header: {
				'object': 'user',
				'action': 'list',
				'code': 0,
				'message': 'success'
			},
			body: {
				list:users
			}
		});
		return;
	}).catch((err) => {
		res.json({
			header: {
				'object': 'user',
				'action': 'list',
				'code': 1,
				'message': 'error'
			},
			body: {
				error: err
			}
		});
	});
});

//get user data by id
router.get('/id/:id', function(req, res){
	usersService.usersGetUserByUUID(req.params.id).then((users) =>{
		var response = {
			header: {
				'object': 'user',
				'action': 'details',
				'code': 1,
				'message': 'error'
			},
            body: {}
		};
		if(users.length != 1){
			//error
			return res.json(response);
		}
		//success
		response.header.code = 0;
		response.header.message = 'success';
		response.body.user = users[0];
		res.send(response);
    }).catch((err) => {
 		res.json({
			header: {
				'object': 'user',
				'action': 'details',
				'code': 2,
				'message': 'error'
			},
			body: {
				error: err
			}
		});   
    });
});

module.exports = router;
