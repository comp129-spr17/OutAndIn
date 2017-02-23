var express = require('express');
var router = express.Router();
var messaging = require('../controllers/messaging');
var users = require('../controllers/users');

//router.use('/messagingHandler', messaging);
router.use('/users', users);

module.exports = router;
