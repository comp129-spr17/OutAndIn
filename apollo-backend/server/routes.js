var express = require('express');
var router = express.Router();
var messaging = require('../controllers/messaging');
var users = require('../controllers/users');
var chats = require('../controllers/chats');
var register = require('../controllers/register');
var session = require('../controllers/session');
var search = require('../controllers/search');

// Initialize any prep work before controller is used
users.init();
chats.init();
register.init();
session.init();
search.init();

// Register routes
router.use('/chats', chats.router);
router.use('/users', users.router);
router.use('/register', register.router);
router.use('/session', session.router);
router.use('/search', search.router);

module.exports = router;
