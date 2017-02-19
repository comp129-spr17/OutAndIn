var express = require('express');
var router = express.Router();
var messaging = require('../controllers/messaging');

router.use('/messagingHandler', messaging);


module.exports = router;
