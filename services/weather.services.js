const Weather = require('../models/weather.model');
const config = require('config');


exports.saveWeather = async function (param) {
    try {
        const newWeather = await Weather.create(param);
        console.log('new weather list in service ', newWeather);
        return newWeather
    } catch (err) {
        throw new Error('Error while saveWeather');
    }
};


exports.getWeatherHistory = async function (param) {
    try {
        console.log('trying to find this history: ', param);
        const history = await Weather.find(param, { request_date: true, "weatherList.city.name": true }).sort({request_date: -1});
        if (!history) throw new Error('history not found');
        console.log('history found');
        return history;
    }
    catch (err) {
        if (err.message) throw err;
        throw new Error('Error while getWeatherHistory');
    }
};