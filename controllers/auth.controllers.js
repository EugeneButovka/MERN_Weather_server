const UserService = require('../services/user.services');
const Validating = require('../utilites/validating.utils');
const Crypting = require('../utilites/crypting.utils');



exports.login = async (req, res) => {
    console.log('try login');
    const {email, password} = req.body;
    
    //check user by email and hashed password
    let user = null;
    let checkResult = null;
    try {
        user = await UserService.getUser({email});
        //console.log('user found', user);
        checkResult = await Crypting.checkPassword(password, user.password);
        console.log('passwords match!');
    }
    catch (err) {
        console.log('login fail', err);
        return res.status(400).json({message: err.message, error: "get user error"});
    }
    
    
    //try making token for user
    let token = null;
    try {
        token = Crypting.makeWebToken(user._id);
        console.log('make token success!');
    }
    catch (err) {
        console.log('make token fail', err);
        return res.status(400).json({message: err.message, error: "make token fail"});
    }
    
    return res.status(200).json({token, currentUserId: user._id});
};

exports.register = async (req, res) => {
    console.log('try register');
    const {name, email, password} = req.body;
    
    try {
        Validating.validateUserData(name, email, password);
    }
    catch (err) {
        return res.status(400).json({message: err.message, error: "validate data error"});
    }
    
    //check user exits by email
    try {
        console.log('attempt to find user');
        await UserService.getUser({email});
        console.log('user found!');
        return res.status(400).json({message: "register error", error: "user already exists"});
    }
    catch (err) {
        //user not found = OK
        console.log('user not found -> OK');
    }
    
    //try create new user with hashed password
    const encryptedPassword = await Crypting.hashPassword(password);
    
    const newUser = {
        name,
        email,
        password: encryptedPassword
    };
    try {
        const user = await UserService.createUser(newUser);
        console.log('user created in controller', user);
    } catch (err) {
        return res.status(400).json({message: err.message, error: "create user error"});
    }
    
    return res.status(200).json({success: true});
};

exports.checkLogin = async (req, res) => {
    //token check is performed in express -> auth.middleware
    return res.status(200).json({success: true});
};






