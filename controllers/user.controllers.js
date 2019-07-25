const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.services');

exports.getUser = async (req, res) => {
  
    //check user exits by email
    try {
        console.log('attempt to find user');

        //console.log('req.params', req.params);
        const user = await UserService.getUser(req.params);
        console.log('user found!');
        return res.status(200).json(user);
    }
    catch (err) {
        //user not found = OK
        console.log('400');
        return res.status(400).json({message: "register error", error: "user already exists"});
    }
};


exports.getCurrentUser = async (req, res) => {
    
    //check user exits by email
    try {
        console.log('attempt to get current user');
        
        //console.log('req.params', req.params);
        const user = await UserService.getUser(req.user._id);
        console.log('current user found!');
        const {name, email, register_date} = user;
        return res.status(200).json({name, email, register_date});
    }
    catch (err) {
        //user not found = OK
        console.log('current user request error');
        return res.status(400).json({message: "register error", error: "user already exists"});
    }
};

