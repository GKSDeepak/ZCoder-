const express = require('express');
const cors = require('cors');
const app = express();
const { connectToMongoDb }= require('./config/db')
const port = 8008;
const userRouter = require('./api/user')
const postRouter = require('./routes/solutionRoute')

// for accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());
app.use(express.urlencoded({extended:true}));
app.use(cors());

connectToMongoDb('mongodb://localhost:27017/login-server').then(()=>{
    console.log('mongo connecrted')
})

app.use('/user', userRouter);
app.use('/user',postRouter);

app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
})