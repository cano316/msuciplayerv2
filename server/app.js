const express = require('express');
const app = express();
require('dotenv').config({ path: '../.env' })
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const Song = require('./models/Song');

const DB_URL = process.env.DB_URL;

main().catch(e => console.log(e));
async function main() {
    await mongoose.connect(DB_URL);
    console.log('CONNECTED TO MONGODB')
}

app.use(cors());
app.use(express.urlencoded({ extended: true }))
// This is needed because axios sends post request as JSON, we need to parse it.
app.use(express.json())

// GET ALL SONGS
app.get('/api/songs', async (req, res) => {
    const allSongs = await Song.find({});
    res.status(200).json(allSongs);
})

// POST NEW SONG
app.post('/api/songs', async (req, res) => {
    const newSong = new Song(req.body);
    await newSong.save((err, userInput) => {
        if (err) return res.status(400).send(err.name);
        res.status(200).json(userInput)
    });
});

// GET SONG BY ID
app.get('/api/songs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const foundSong = await Song.findById(id);
        res.status(200).json(foundSong);
    } catch (error) {
        // send 404 status
        res.status(404).end();
    };
});



app.listen(8000, function () {
    console.log('NOW LISTENING ON PORT 8000')
})