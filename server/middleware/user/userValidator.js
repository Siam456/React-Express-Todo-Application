const {check, validationResult} = require('express-validator');
const createHttpError = require('http-errors');
const people = require('../../models/usersModel');

const userValidator = [
    check('username')
        .isLength({min: 1})
        .withMessage("Name is required")
        .isAlpha("en-US", {ignore: "-"})
        .withMessage('Name must not contain anything other than alphabet')
        .trim(),
    check('email')
        .isEmail()
        .withMessage("Invalid Email address!!")
        .trim()
        .custom(async (value) => {
            try{
                const usedEmail = await people.find({email: value});
                if(usedEmail.length !== 0){
                    throw createHttpError('Email is already in used!!');
                }
            } catch (err){
                throw createHttpError(err.message);
            }
        }),
    check('phone')
        .isMobilePhone('bn-BD')
        .withMessage('Enter a Bangladeshi mobile number')
        .trim()
        .custom(async (value) => {
            try{
                const usedPhone = await people.find({phone: value});
                if(usedPhone.length !== 0){
                    throw createHttpError('Number is already in used!!');
                }

            } catch(err){
                throw createHttpError(err.message);
            }
        }),
    check('password')
        .isLength({min: 8})
        .withMessage('password must be at least 8 chars long'),
        
]

const checkUserValidation = (req, res, next) => {
    const errors = validationResult(req);
    const mapErrors = errors.mapped();


    if(Object.keys(mapErrors).length === 0){
        next()
    } else{
        res.status(500).json({
            errors: mapErrors,
        })
    }
}

module.exports = {
    userValidator,
    checkUserValidation
}