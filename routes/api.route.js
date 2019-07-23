var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controllers');

router.get('/user/:_id', UserController.getUser);
//router.post('/register', AuthController.register);

module.exports = router;