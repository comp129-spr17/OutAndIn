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

router.get('/', function(req, res){
    // Get all users
    usersService.getAllUsers().then((results) => {
        console.log(results);
        res.send(results); 
    }).catch((err) => {
        res.send(err); 
    });
});

module.exports = router;
