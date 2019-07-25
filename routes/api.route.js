var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controllers');
var WeatherController = require('../controllers/weather.controllers');
var AuthController = require('../controllers/auth.controllers');

router.post('/user', AuthController.updateCurrentUser);
router.get('/user', UserController.getCurrentUser);
router.get('/user/:_id', UserController.getUser);

router.post('/weather', WeatherController.saveWeather);
router.get('/weather', WeatherController.getWeatherHistory);
router.get('/weather/:_id', WeatherController.getWeatherDetails);

module.exports = router;