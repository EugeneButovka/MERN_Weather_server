//const config = require('config');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const WeatherService = require('../services/weather.services');

exports.saveWeather = async (req, res) => {
  
    //check user exits by email
    try {
        console.log('attempt to save weather list');
        
        const user = await WeatherService.saveWeather({ownerId: req.user._id, weatherList: req.body});
        console.log('weather saved!');
        return res.status(200).json({success: true});
    }
    catch (err) {
        //user not found = OK
        console.log('400');
        return res.status(400).json({message: "Weather save error", error: "Weather already exists"});
    }
};



exports.getWeatherHistory = async (req, res) => {
    
    try {
        console.log('attempt get all weather request history for user with ID: ' + req.user._id);
        
        const history = await WeatherService.getWeatherHistory(req.user._id);
        //console.log('history found!');
        return res.status(200).json(history);
    }
    catch (err) {
        //user not found = OK
        console.log('400');
        return res.status(400).json({message: "history error", error: "history not found"});
    }
};


exports.getWeatherDetails = async (req, res) => {
    console.log('params', req.params);
    try {
        console.log('attempt get weather details with ID: ' + req.params._id);
        
        const weatherDetails = await WeatherService.getWeatherDetails(req.params._id);
        //console.log('history found!');
        return res.status(200).json(weatherDetails);
    }
    catch (err) {
        //user not found = OK
        console.log('400');
        return res.status(400).json({message: "weather details error", error: "weather details not found"});
    }
};