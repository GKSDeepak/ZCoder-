const express = require('express');
const app = express();
const { connectToMongoDb }= require('./config/db')
const port = 8008;
const userRouter = require('./api/user')

// for accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());
app.use(express.urlencoded({extended:true}));

connectToMongoDb('mongodb://localhost:27017/login-server').then(()=>{
    console.log('mongo connecrted')
})

app.use('/user', userRouter);

app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
})