const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.services');


const makeWebToken = (param) => {
    const payload = {
        param
    };
    
    const secretKey = config.get('jwtSecret');
    
    const options = {
        //algorithm: 'RS256',
        expiresIn : 3600
    };
    
    
    const result = jwt.sign(payload, secretKey, options);
    if (!result) throw new Error("make token error");
    console.log(result);
    return result;
    
};


const hashPassword = async (password) => {
    return await bcrypt.hash(password, config.get('bcryptSalt'));
};


const checkPassword = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    if (!result)
        throw new Error({error: 'Incorrect User email or password'})
    return true;
};

const validateData = (name, email, password) => {
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
    try {
        user = await UserService.getUser({email});
        await checkPassword(password, user.password);
    }
    catch (err) {
        return res.status(400).json({message: err.message, error: "get user error"});
    }
    const token = makeWebToken(user._id);
    
    return res.status(200).json({token});
};

exports.register = async (req, res) => {
    console.log('try register');
    const {name, email, password} = req.body;
    
    try {
        validateData(name, email, password);
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

    
    
    //create new user with hashed password
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
    
    //const token = makeWebToken(user._id);
    
    //return res.status(200).json({token});
    return res.status(200).json(user);
};

exports.checkLogin = async (req, res) => {

}


