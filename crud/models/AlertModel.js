// Initialize Mongoose
const mongoose = require('mongoose');
const Types=mongoose.Types;
const Schema = mongoose.Schema;
const AlertSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    source: {
        type: Types.ObjectId,
        ref: 'Camera',
        required: false
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false
    }

}, {
    timestamps: true
});
const Alert = mongoose.model('Alert', AlertSchema);
module.exports = Alert;