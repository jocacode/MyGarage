const mongoose = require('mongoose');
const UserSchema =  mongoose.Schema({
    Email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    Username: {
        type: String,
        required: true,
        max:255,
        min: 6
    },
    Password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    Date: {
        type: Date,
        default: Date.now
    },
    Cars: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Users', UserSchema);