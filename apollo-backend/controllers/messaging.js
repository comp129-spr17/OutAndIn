var express = require('express');
var router = express.Router();
var messagingService = require('../services/messaging');

// Messaging handler
router.get('/', function(req, res){
    res.send("working!");
});

module.exports = router;
