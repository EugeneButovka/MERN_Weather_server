const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.getUsers = async function (query = null, page, limit) {
    return (
        await User
            .find(query)
            .sort({register_date: -1})
            .catch(err => 'Error while Paginating Users')
    )
};

exports.getUser = async function (id) {
    return await User
        .findById(id)
        .catch(err => 'Error while getting user');
};

exports.isUserExists = async function (user) {
    return await User
        .findOne(user)
        .catch(err => 'Error while isUserExists');
};


exports.createUser = async function (user) {
    const {name, email, password} = user;
    
    //validation
    if (!name || !email || !password)
        return {msg: 'Incorrect User Data'};
    
    console.log({name, email, password});
    //console.log(isUserExists({email}));
    //user exist check only by email
    /*if (isUserExists({email}))
        return {msg: 'Email already exists'};*/
    
    const newUser = new User({
        name,
        email,
        password
    });
    
    // Create salt & hash => save new user
    await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
        })
    });
    
    console.log(newUser);
    return await newUser
        .save()
        .catch(err => 'Error while saving user');
};


exports.deleteUser = async function (id) {
    return await User
        .findById(id)
        .then(user =>
            user.remove()
                .then(() => ({success: true})))
        .catch(err => ({success: false}));
};
