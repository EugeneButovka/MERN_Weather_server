const UserService = require('../services/user.services');


exports.login = async (req, res) => {
    console.log('try login');
    const {email, password} = req.body;
    //check user exits by email and password
    const user = await UserService.isUserExists({email, password});
    console.log(user);
    if (!user) return res.status(400).json({msg: "no such user"});
    return res.json(user);
};

exports.register = async (req, res) => {
    console.log('try register');
    const {name, email, password} = req.body;
    const user = await UserService.createUser({name, email, password});
    //console.log(user);
    if (!user.msg) res.json(user);
    else res.status(400).json(user.msg);
};


