const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const AuthController = require('../controllers/auth.controllers');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/checkLogin', authMiddleware.checkToken, AuthController.checkLogin);

module.exports = router;