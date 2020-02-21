const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    Content: {
        type: String,
        required: true
    },
    PostId: {
        type: String,
        required: true
    },
    UserId: {
        type: String,
        required: true
    },
    Likes: [{
        type: String,
        required: false
    }],
    Dislikes: [{
        type: String,
        required: false
    }]

});

module.exports = mongoose.model('Comments', CommentSchema)