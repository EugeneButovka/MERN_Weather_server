const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // body parser for JSON middleware

const db = require('./config/keys').mongoURI;

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
app.use('/api', require('./routes/api.route'));

const port = 5000;

app.listen(port, () => console.log(`server started on port ${port}`));