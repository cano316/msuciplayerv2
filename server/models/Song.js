const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    songName: String,
    artist: String,
    image: {
        url: String,
        filename: String
    },
    audio: {
        url: String,
        filename: String
    }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;