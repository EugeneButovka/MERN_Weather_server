const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.services');


const encryptPassword = (password) => {
    return bcrypt.hashSync(password, config.get('bcryptSalt'));
};

//TODO: get to know await with bcrypt!
//TODO: use async crypt functions instead
const checkPassword = (password, hash) => {
    // let hashPwd = await bcrypt.hash(password,10);
    // console.log(await hashPwd);
    return bcrypt.compareSync(password, hash);
};

const validateData = (name, email, password) => {
    //validation
    if (!name || !email || !password)
        return {error: 'Incorrect User Data'};
    return {error: null};
};

exports.login = (req, res) => {
    console.log('try login');
    const {email, password} = req.body;
    
    //check user exits by email and password
    const user = UserService.getUser({email, password});
    
    console.log(user);
    if (user.error)
        return res.status(400).json(user.error);
    return res.json(user);
};

exports.register = async (req, res) => {
    console.log('try register');
    const {name, email, password} = req.body;
    
    const checkResult = validateData(name, email, password);
    if(checkResult.error)
        return res.status(400).json(checkResult.error);
    
    //TODO: user exists check
    
    const encryptedPassword = encryptPassword(password);
    
    const newUser = {
        name,
        email,
        password: encryptedPassword
    };
    try {
        const user = await UserService.createUser(newUser)
        console.log('user in controller', user)
        
        // sync code
        // const data = await somePromise
        res.status(200).json(user)
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
        
            // console.log(user);
      
    // console.log(user);
    // if (user.error)
    //     return res.status(400).json(user.error);

    // return res.json(user);
};


