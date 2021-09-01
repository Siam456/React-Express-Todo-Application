const express = require('express');

const router = express.Router();

const { userValidator, checkUserValidation } = require('../middleware/user/userValidator');
const { editUserValidator, checkEditUserValidation } = require('../middleware/user/editUserValidation');
const checkAdmin = require('../middleware/user/checkAdmin')

//external import
const people = require('../models/usersModel');
const {showUser , addUsers, updateUser, deleteUsers} = require('../controller/userControler');
const checkLogin = require('../middleware/checklogin/checkLogin')

router.get('/', checkLogin, checkAdmin, showUser);
router.post('/', userValidator, checkUserValidation, addUsers);
router.put('/:id', checkLogin, checkAdmin,  editUserValidator, checkEditUserValidation, updateUser);
router.delete('/:id', checkLogin, checkAdmin, deleteUsers)

module.exports = router;