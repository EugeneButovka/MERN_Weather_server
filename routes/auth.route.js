var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/auth.controllers');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

module.exports = router;