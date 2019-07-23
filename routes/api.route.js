var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controllers');
var WeatherController = require('../controllers/weather.controllers');

router.get('/user/:_id', UserController.getUser);
router.post('/weather', WeatherController.saveWeather);
router.get('/weather', WeatherController.getWeatherHistory);

module.exports = router;