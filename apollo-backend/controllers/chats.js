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

router.get('/', function(req, res){
    chatsService.chatsCreateRoom().then((res) => {
        console.log(res);
        res.send(results);
    }).catch((err) => {
        res.send(err); 
    });
});

module.exports = router;
