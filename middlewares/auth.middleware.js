const jwt = require('jsonwebtoken');
const config = require('config');
const UserService = require('../services/user.services');

exports.checkToken = (req, res, next) => {
    console.log('THIS IS MW');
    
    const secretKey = config.get('jwtSecret');
    const {token} = req.headers;
    const id = null;
    
    //check user token
    let user = null;
    let checkResult = null;
    // try {
    //     checkResult = await verifyIdAndToken(id, token);
    //     console.log('token OK!', checkResult);
    // }
    // catch (err) {
    //     console.log('token check fail', err);
    //     return res.status(400).json({message: err.message, error: "wrong token"});
    // }
    jwt.verify(token, secretKey, async function(err, decoded) {
        if (err) console.log('err MW', err);
    
        if(err) return res.status(403).json({message: 'Forbidden'});
        console.log('decoded', decoded); // bar
        try {
            user = await UserService.getUser({_id: decoded._id});
            req.user = user;
            next()
        }
        catch (err) {
            console.log('login fail', err);
            return res.status(403).json({message: "Forbidden"});
        }
        //
    });
}