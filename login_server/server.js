const express = require('express');
const cors = require('cors');
const app = express();
const { connectToMongoDb }= require('./config/db')
const port = 8008;
const userRouter = require('./api/user')
const postRouter = require('./routes/solutionRoute')
const bookmarkRouter = require('./routes/bookmarksRoute');
const commentRouter = require('./routes/commentsRoute')
// for accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());
app.use(express.urlencoded({extended:true}));
app.use(cors());

connectToMongoDb('mongodb+srv://jajamabhijith2004:Devabhi2004@users.ralw0gb.mongodb.net/backend').then(()=>{
    console.log('mongo connecrted')
})

app.use('/user', userRouter);
app.use('/user',postRouter);
app.use('/user',bookmarkRouter);
app.use('/user',commentRouter);

app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
})