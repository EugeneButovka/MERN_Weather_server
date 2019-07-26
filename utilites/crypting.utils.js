const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//===============TOKEN ROUTINE============
exports.makeWebToken = (param) => {
    const payload = {
        _id: param
    };
    
    const secretKey = config.get('jwtSecret');
    
    const options = {
        //algorithm: 'RS256',
        //expiresIn: 3600
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

exports.hashPassword = async (password) => {
    return await bcrypt.hash(password, config.get('bcryptSalt'));
};


exports.checkPassword = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    if (!result)
        throw new Error({error: 'Incorrect User email or password'});
    return true;
};
//=======================================