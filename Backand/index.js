const express = require('express');
const bodyParser = require('body-parser');
const posts = require('./routes/post')
const cors = require('cors');
const PostRouter = require('./routes/post');
const CommentRouter = require('./routes/comment');
const CarRouter = require('./routes/car');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const app = express()

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:8080'
}));

const config = require('./config');
mongoose.connect(config.dbUrl, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log('connected to database!');
})
mongoose.connection.on('error', () => {
    console.log('failed to connect to db');
})

app.use('/Post', PostRouter);
app.use('/Comment', CommentRouter);
app.use('/Car', CarRouter);
app.use('/User',auth);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server is running!')
})