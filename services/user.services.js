const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const config = require('config');

exports.isUserExist = function (user) {
    return (async () => await User
        .findOne(user)
        .catch(err => ({error: 'Error while isUserExist'})))();
};

exports.createUser = function (user) {
    console.log('user = ', user);
    const {name, email, encryptedPassword} = user;
    
    return new Promise((resolve, reject) => {
        return User.create({
            name,
            email,
            password: encryptedPassword
        }, function (err, result) {
            if (err) return reject(err);
            resolve(result)
        });
    })
    

    
    // const newUser = new User({
    //     name,
    //     email,
    //     password: encryptedPassword
    // });
    //
    // return saveUser(newUser);
    /*
    let result = (async function() {
        try {
            return await  newUser.save();
        } catch (err) {
            return {error: 'Error while saving user'};
        }
    })();
    console.log('result = ', result);
    return result;
    */
    /*
    return (async () => {
        const result = await newUser
            .save()
            .catch(err => ({error: 'Error while saving user'}));
        return result;
    })();*/
    /*
    return (async () => await newUser
        .save()
        .catch(err => ({error: 'Error while saving user'})))();*/
};

function saveUser(newUser) {
    return new Promise((resolve, reject) => {
        return newUser.save()
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}
//
// async function saveUser(newUser) {
//
//     const result = await newUser
//         .save();
//         //.catch(err => ({error: 'Error while saving user'}));
//     return result;
// }
