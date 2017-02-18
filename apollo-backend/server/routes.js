var express = require('express');
var router = express.Router();
var messaging = require('../controllers/messaging');

router.use('/messaging', messaging);


module.exports = router;
