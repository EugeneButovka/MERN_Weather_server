const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const config = require('config');

exports.getUser = async function (param) {
    try {
        const user = await User.findOne(param);
        if (!user) throw new Error('User not found');
        console.log('user found ', user);
        return user;
    }
    catch (err) {
        if (err.message) throw err;
        throw new Error('Error while getUser');
    }
};

exports.createUser = async function (param) {
    try {
        const newUser = await User.create(param);
        console.log('new user in service ', newUser);
        return newUser
    } catch (err) {
        throw new Error('Error while createUser');
    }
};