const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PostRouter = require('./routes/post');
const CommentRouter = require('./routes/comment');
const CarRouter = require('./routes/car');
const UserRouter = require('./routes/user');
const auth = require('./routes/auth');
const MessageRouter = require('./routes/message');
const LoadManagerRouter = require('./routes/loaderManager');
const mongoose = require('mongoose');
const app = express()

require('dotenv').config();
app.use(bodyParser.json());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });
app.use(cors({
    origin: 'http://localhost:8080'
}));
//app.use(cors());

const config = require('./config');
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log('connected to database!');
})
mongoose.connection.on('error', () => {
    console.log('failed to connect to db');
})

app.use('/Post', PostRouter);
app.use('/Comment', CommentRouter);
app.use('/Car', CarRouter);
app.use('/Auth',auth);
app.use('/Message', MessageRouter);
app.use('/LoadManager', LoadManagerRouter);
app.use('/User', UserRouter);


const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log('Server is running!')
})