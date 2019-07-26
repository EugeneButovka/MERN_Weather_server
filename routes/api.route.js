const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controllers');
const WeatherController = require('../controllers/weather.controllers');
//const AuthController = require('../controllers/auth.controllers');

router.post('/user', UserController.updateCurrentUser);
router.get('/user', UserController.getCurrentUser);
router.get('/user/:_id', UserController.getUser);

router.post('/weather', WeatherController.saveWeather);
router.get('/weather', WeatherController.getWeatherHistory);
router.get('/weather/:_id', WeatherController.getWeatherDetails);

module.exports = router;