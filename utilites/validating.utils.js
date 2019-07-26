


//================AUXILIARY FUNCTIONS==========
 exports.validateUserData = (name, email, password) => {
    //validation
    if (!name || !email || !password)
        throw new Error({error: 'Incorrect User Data'});
    return true;
};