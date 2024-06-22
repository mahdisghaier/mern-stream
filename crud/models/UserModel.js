const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    First_name: {
        type: String,
        required: true
    },
    Last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    phone: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
