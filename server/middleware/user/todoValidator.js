const { check, validationResult } = require('express-validator');

const todoValidator = [
    check("title")
        .isLength({min: 1})
        .withMessage("Title is Required")
        .trim(),
    check("description")
    .isLength({min: 1})
    .withMessage("Description is Require"),
]


const todoValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    const mapErrors = errors.mapped();

    if(Object.keys(mapErrors).length  === 0){
        next();
    } else{
        res.status(500).json({
            errors: mapErrors,
        })
    }
}

module.exports = { todoValidator, todoValidationResult };