const express = require('express');
const {todoget, 
    todoPost ,
    todoDelete , 
    updateTodo,
    updateTodoCount,
    updateTodoCountReset} = require('../controller/todoControler')

const router = express.Router();

const { todoValidator, todoValidationResult } = require('../middleware/user/todoValidator');
const checkLogin = require('../middleware/checklogin/checkLogin')

router.get('/', checkLogin, todoget);
router.post('/', todoValidator, todoValidationResult, checkLogin, todoPost);
router.delete('/:id', checkLogin, todoDelete);

router.put('/:id', checkLogin , updateTodo);

router.put('/count/:id', checkLogin , updateTodoCount);
router.put('/count/reset/:id', checkLogin , updateTodoCountReset);




module.exports = router;