const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    songName: '',
    artist: '',
    imgSrc: '',
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;