const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const port = 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
require('dotenv').config()

//cookie parser
app.use(cookieParser(process.env.COOKIE_PARSER))

//database connection
mongoose.connect(process.env.DATABASE_CONNECTION_STRING,
    {   useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true }
)
.then(() => {
    console.log('connection Successfully');
}).catch((err) => {
    throw err;
})

//internal import
const todo = require('./route/todoRouter');
const users = require('./route/usersRoute');
const login = require('./route/loginRouter');

const checklogin = require('./middleware/checklogin/checkLogin')

app.use('/todo', todo);
app.use('/user', users);
app.use('/login', login);

app.get('/userprofile' , checklogin, (req, res) => {
    if(req.user){
        res.json({
            profile: req.user
        })
    }
})


app.get('/logout' , (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.end()
})





app.listen(port, () => {
    console.log(`server start successfully on port ${port}`);
})