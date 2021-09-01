const express = require('express');

//internal export
const {loginGet, postLogin} = require('../controller/loginControler');
const checkLogin = require('../middleware/checklogin/checkLogin');

const router = express.Router();

router.get('/', checkLogin, loginGet);

router.post('/', postLogin);

module.exports = router;