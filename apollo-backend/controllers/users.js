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

// OPTIONS - Routes permitted per route
var _OPTIONS = {
	// Default Users Route
	"/": {
		"METHODS": [
			"GET",
			"POST"
		],
		"HASHES": new Set()
	}
};

function init(){
	// Initialize the OPTIONS methods for each route
	// Add all routes into the set
	var keys = Object.keys(_OPTIONS);
	keys.forEach(function(key){
		var methods = _OPTIONS[key]["METHODS"];
		methods.forEach(function(method){
			_OPTIONS[key]["HASHES"].add(method);
		});
	});
}

router.get('/', function(req, res){
    usersService.getUserIDList().then((users) => {
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

//create user
router.post('/', function(req, res){
	usersService.getUserByUsername(req.body.username).then((users) =>{
        // User already exists
        if(users.length != 0){
            return 1;
        }
        // Doesn't exist, create it
        return usersService.createUser("", req.body.username, "", "");
    }).then((data) => {
        if(data == 1){
			//return error, user already exists
            return 1;
        }
		return usersService.getUserByUsername(req.body.username);
    }).then((users) =>{
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

router.options('/', function(req, res){
	var origin = req.get('Origin');
	// Check if origin is set
	if(!origin){
		res.sendStatus(404);		
		return;
	}
	// Check if method that is requested is in the methods hash set
	var method = req.get('Access-Control-Request-Method');
	if(_OPTIONS["/"]["HASHES"].has(method)){

		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
		res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
		res.header("Access-Control-Max-Age", 86400);
		res.sendStatus(200);
		return;
	}
	// Send 404 if both of the above conditions are not met
	res.sendStatus(404);
});

// Create User Manually
router.get('/setup', function(req, res){
    var username = "apollo";
    var password = "apollo";

    usersService.getUserByUsername(username).then((users) =>{
        // User already exists
        if(users.length != 0){
            return 1;
        }
        // Doesn't exist, create it
        return usersService.createUser("apollo@apollo.com", "apollo", "apollo", "apollo");
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

//get all user ids
router.get('/list', function(req, res){
	usersService.getUserIDList().then((users) => {
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
	usersService.getUserByUUID(req.params.id).then((users) =>{
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

module.exports = {
	init: init,
	router: router
};
