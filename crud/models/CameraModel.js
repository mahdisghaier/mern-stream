// Initialize Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CameraSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    url: {
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
const Camera = mongoose.model('Camera', CameraSchema);
module.exports = Camera;

