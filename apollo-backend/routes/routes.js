var express = require('express');
var router = express.Router();
var messaging = require('../controllers/messaging');
var users = require('../controllers/users');
var chats = require('../controllers/chats');

// Initialize any prep work before controller is used
users.init();

router.use('/users', users.router);
router.use('/chats', chats);

module.exports = router;
