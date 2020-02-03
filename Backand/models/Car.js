const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    Brand: {
        type: String,
        required: true
    },
    Model: {
        type: String,
        required: true
    },
    UserId: {
        type: String,
        required: true
    },
    Photos: []
});

module.exports = mongoose.model('Cars', CarSchema);