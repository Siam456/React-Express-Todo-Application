const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        require: true,
        type: String,
    },
    description: String,
    status: {
        type: String,
        default: 'inactive',
        enum: ['active', 'inactive'],
    },
    Tdate: {
        type: Date,
        default: Date.now,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    userA: {
        id: mongoose.Types.ObjectId,
        name: String,
        email: String,
        phone: String,
    },
    process: {
        type: String,
        default: 'Not done yet',
        enum: ['Not done yet' , 'Done'],
    },
    count: {
        type: Number,
        default: 0,
    }
});

const todoModel = mongoose.model('todo', todoSchema);

module.exports = todoModel;

