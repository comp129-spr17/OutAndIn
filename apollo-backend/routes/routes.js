var express = require('express');
var router = express.Router();
var messaging = require('../controllers/messaging');
var users = require('../controllers/users');
var chats = require('../controllers/chats');

router.use('/users', users);
router.use('/chats', chats);

module.exports = router;
