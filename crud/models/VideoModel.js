// Initialize Mongoose
const mongoose = require('mongoose');
const Types=mongoose.Types;
const Schema = mongoose.Schema;
const VideoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    source: {
        type: Types.ObjectId,
        ref: 'Camera',
        required: false
    },
    storage_location: {
        type: String,
        required: true
    },
    
    duration: {
        type: String,
        required: false
    }

}, {
    timestamps: true
});
const Video = mongoose.model('Videorec', VideoSchema);
module.exports = Video;