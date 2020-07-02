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
    Photos: [],
    Year: {
        type: String,
        required: true
    },
    Engine: {
        type: String,
        required: true
    },
    Kilometars: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Cars', CarSchema);