var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/auth.controllers');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/checkLogin', AuthController.checkLogin);

module.exports = router;