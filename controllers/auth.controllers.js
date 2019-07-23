const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.services');

//===============TOKEN ROUTINE============
const makeWebToken = (param) => {
    const payload = {
        _id: param
    };
    
    const secretKey = config.get('jwtSecret');
    
    const options = {
        //algorithm: 'RS256',
        expiresIn: 3600
    };
    
    let result = null;
    try {
        result = jwt.sign(payload, secretKey, options);
    } catch (err) {
        throw new Error("make token error");
    }
    if (!result) new Error("made wrong token");
    console.log(result);
    return result;
    
};
// //=======================================

//===============HASH ROUTINE============

const hashPassword = async (password) => {
    return await bcrypt.hash(password, config.get('bcryptSalt'));
};


const checkPassword = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    if (!result)
        throw new Error({error: 'Incorrect User email or password'});
    return true;
};
//=======================================


//================AUXILIARY FUNCTIONS==========
const validateUserData = (name, email, password) => {
    //validation
    if (!name || !email || !password)
        throw new Error({error: 'Incorrect User Data'});
    return true;
};


exports.login = async (req, res) => {
    console.log('try login');
    const {email, password} = req.body;
    
    //check user by email and hashed password
    let user = null;
    let checkResult = null;
    try {
        user = await UserService.getUser({email});
        //console.log('user found', user);
        checkResult = await checkPassword(password, user.password);
        console.log('passwords match!');
    }
    catch (err) {
        console.log('login fail', err);
        return res.status(400).json({message: err.message, error: "get user error"});
    }
    
    
    //try making token for user
    let token = null;
    try {
        token = makeWebToken(user._id);
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
        validateUserData(name, email, password);
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
    const encryptedPassword = await hashPassword(password);
    
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


