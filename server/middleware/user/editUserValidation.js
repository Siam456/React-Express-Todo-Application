const {check, validationResult} = require('express-validator');

const editUserValidator = [
    check('username')
        .isLength({min: 1})
        .withMessage("Name is required")
        .isAlpha("en-US", {ignore: "-"})
        .withMessage('Name must not contain anything other than alphabet')
        .trim(),
    check('email')
        .isEmail()
        .withMessage("Invalid Email address!!")
        .trim(),
    check('phone')
        .isMobilePhone('bn-BD')
        .withMessage('Enter a Bangladeshi mobile number')
        .trim(),
    check('password')
        .isLength({min: 8})
        .withMessage('password must be at least 8 chars long'),
        
]

const checkEditUserValidation = (req, res, next) => {
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
    editUserValidator,
    checkEditUserValidation
}