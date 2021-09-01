const todoModel = require('../models/todoModel');
const userModel = require('../models/usersModel');

async function todoget(req, res) {
    try{
        const data = await todoModel.find({'userA.id': req.user._id})
        .sort({Tdate: 1});
        if(data){
            res.json({
                data,
            })
        } else{
            res.send('null')
        }
        
    } catch(err){
        throw err;
    }
}

async function todoPost(req, res){
    const todoInsert = new todoModel({
        ...req.body,
        userA: {
            id: req.user._id,
            name: req.user.username,
            email: req.user.email,
            phone: req.user.phone,
        }
    });
    try{
        const data = await todoInsert.save();

        await userModel.updateOne({_id: req.user._id},
            {
                $push: {
                    todos: data._id,
                }
            })

        res.json({
            data,
        })
        
    } catch(err){
        throw err;
    }
}

async function todoDelete(req, res) {
    try{
        const result = await todoModel.deleteOne({_id: req.params.id});

        res.json({
            result
        })
    } catch(err){
        throw err
    }

}

const updateTodo = async (req, res) => {
    try{
        const response = await todoModel.updateOne({_id:req.params.id},
            {
                $set: {process: 'done'}
            })

    } catch{
        throw err
    }
}

const updateTodoCount = async (req, res) => {
    try{
        const response = await todoModel.updateOne({_id:req.params.id},
            {
                $inc: { count: 1, "metrics.orders": 1 }
            })

    } catch{
        throw err
    }
}

const updateTodoCountReset = async (req, res) => {
    try{
        const response = await todoModel.updateOne({_id:req.params.id},
            {
                $set: {count: 0}
            })

    } catch{
        throw err
    }
}


module.exports = {todoget,
    todoPost, 
    todoDelete, 
    updateTodo,
    updateTodoCount,
    updateTodoCountReset};
