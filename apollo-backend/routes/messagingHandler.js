var express = require('express');
var router = express.Router();

//TODO: get message id, get from and store to database 

var globalMess = globalMess || [];

router.post('/global', function(req, res)
	{
		//Error handling
		if(!req.body.user)
			throw {message: "No user given"};
		if(!req.body.message)
			throw {message: "no message given"};
		if(typeof req.body.user != 'string')
			throw {message: "User is not a string"}
		if(typeof req.body.message != 'string')
			throw {message: "Message is not a string"}

		globalMess.push({
			user: req.body.user,
			message: req.body.message,
			timeStamp: Math.floor(Date.now() / 1000) // UNIX timestamp
		});

		res.send(JSON.stringify(globalMess));

	});

module.exports = router;
