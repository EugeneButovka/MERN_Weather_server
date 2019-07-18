const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

//user model
const User = require('../../models/user.model');

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
    User.find()
        .sort({date: -1})
        .then(users => res.json(users));
});

// @route   POST api/users
// @desc    Create A User
// @access  Public
router.post('/', (req, res) => {
    const {name, email, password} = req.body;
    
    //validation
    if (!name || !email || !password)
        return res.status(400).json({msg: "enter name, email, password"});
    
    //user exist check
    User.findOne({email})
        .then(user => {
            if (user) res.status(400).json({msg: "email exists"});
        });
    
    const newUser = new User({
        name,
        email,
        password
    });
    
    
    // Create salt & hash => save new user
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => res.json(user));
        })
    });
});


// @route   DELETE api/users/:id
// @desc    Delete A User
// @access  Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user =>
            user.remove()
                .then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});


module.exports = router;
