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
    }

});

module.exports = mongoose.model('Comments', CommentSchema)