const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config({ path: '../.env' })
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const Song = require('./models/Song');

const multer = require('multer');
const { memoryStorage } = require('multer');
const upload = multer({
    storage: memoryStorage(),
    // limits: {
    //     fileSize: 5 * 1024 * 1024
    // }
})
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    keyFilename: path.join(__dirname, '../google_cloud_storage/musicplayerv2-375305-f8ce610d854f.json'),
    projectId: 'musicplayerv2-375305'
})
const bucket = storage.bucket('musicplayerv2');
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
app.post('/api/songs', upload.fields([{ name: 'audio' }, { name: 'imgSrc' }]), async (req, res) => {
    const files = req.files;
    const newSong = new Song(req.body);
    for (let key in files) {
        const file = files[key][0];
        const blob = bucket.file(file.originalname);

        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
            resumable: false
        });
        blobStream.on('error', err => {
            next(err);
            console.log(err);
            return
        });

        blobStream.on('finish', () => {
            // blob.makePublic();
        });

        blobStream.end(file.buffer);

        const url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        if (file.fieldname === 'imgSrc') {
            newSong.image = { url: url, filename: file.originalname }
        }
        if (file.fieldname === 'audio') {
            newSong.audio = { url: url, filename: file.originalname }
        }
    }

    newSong.save((err, userInput) => {
        if (err)
            return res.status(400).send(err.name);
        res.status(200).json(userInput);
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