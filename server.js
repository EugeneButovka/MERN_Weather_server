const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // body parser for JSON middleware

const db = require('./server/config/keys').mongoURI;

//connect ot mongoDB
mongoose.connect(
    db,
    {
        useNewUrlParser: true,
        useCreateIndex: true //to eliminate message: DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
    }
    )
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err));

//use routes
app.use('/auth', require('./server/routes/auth.route')); // POST /login  POST /register
app.use('/api', require('./server/routes/api.route'));

//serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000; //first component for HEROCU

app.listen(port, () => console.log(`server started on port ${port}`));