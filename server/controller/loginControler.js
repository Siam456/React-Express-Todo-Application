const people = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginGet = (req, res) => {
    res.send(req.user);
}

const postLogin = async (req, res) => {
    try{
        const user = await people.findOne({
            $or: [
                {email: req.body.username},
                {phone: req.body.username}
            ]
        });
        if(user){
            const checkPass = await bcrypt.compare(req.body.password, user.password);
            
            if(checkPass){
                const userObj = {
                    role: user.role,
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                }

                const token = jwt.sign(userObj, process.env.JWT_SECRATE,{
                    expiresIn: process.env.JWT_EXPIRE,
                });

                //set cookies
                res.cookie(process.env.COOKIE_NAME, token,{
                maxAge: process.env.JWT_EXPIRE,
                signed: true,
                httpOnly: true,
                })
            } else{
                res.status(500).json({
                    errors: {
                        msg: 'Try again!!'
                    }
                })
            } 
        } else{
            res.status(500).json({
                errors: {
                    msg: 'User not found!!'
                }
            })
        }   

    } catch(err){
        res.status(500).json({
            errors: err.message
        });
    }
    
    res.json({
        data: req.body
    });
}

module.exports = {
    loginGet,
    postLogin
};