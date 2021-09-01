const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    }, 
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ["user" , "admin"],
        default: "user"
    },
    todos: [
        {
            type: mongoose.Types.ObjectId,
            ref: "todo"
        }
    ]
},
{
    timestamps: true,
})

const people = mongoose.model("people", userSchema);

module.exports = people;