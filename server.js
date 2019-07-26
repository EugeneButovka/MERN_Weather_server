const express = require('express');
//const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const authMiddleware = require('./middlewares/auth.middleware');

const app = express();
app.use(cors());
app.use(express.json()); // body parser for JSON middleware

const db = config.get('mongoURI');

//connect ot mongoDB
mongoose.connect(
    db,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
    )
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err));

//use routes
app.use('/auth', require('./routes/auth.route')); // POST /login  POST /register
app.use('/api', authMiddleware.checkToken, require('./routes/api.route'));


//TODO: weather api:
//user weather request history list (restricted .find(.., {fields}) request to DB)
//user detailed weather request on date (big .find() request to DB)

//TODO: weather data model
//TODO

const port = 5000;

app.listen(port, () => console.log(`server started on port ${port}`));