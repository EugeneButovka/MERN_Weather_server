const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const WeatherSchema = new Schema({
    ownerId: {
        type: String,
        required: true,
    },
    weatherList: {
        type: Object,
        required: true,
    },
    request_date: {
        type: Date,
        default: Date.now,
        unique: true
    }
});

const Weather = mongoose.model('weather', WeatherSchema);

module.exports = Weather;