const express =require('express');
const mongoose = require('mongoose');

const PostSchema =  mongoose.Schema({
    Content:{
        type: String,
        required: true
    },
    LikeCount: {
        type: Number,
        required: false
    },
    DislikeCount: {
        type: Number,
        required: false
    },
    CarId: {
        type: String,
        required: true
    },
    UserId: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Posts', PostSchema);