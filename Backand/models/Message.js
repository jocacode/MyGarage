const express = require('express');
const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('Message', MessageSchema);