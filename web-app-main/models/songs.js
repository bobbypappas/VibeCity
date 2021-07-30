const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    artist: {
        type: String,
        unique: true,
        required: 'Artist is required',
        trim: true
    },
    track: {
        type: String,
        unique: true,
        required: 'Track is required',
        trim: true
    },
    preview_url: {
        type: String,
        unique: true,
        required: 'Preview url is required',
        trim: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Songs', songSchema);
