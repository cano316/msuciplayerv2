const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

main().catch(e => console.log(e));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/beatfolio');
    console.log('CONNECTED TO MONGODB')
}



app.get('/api/songs', (req, res) => {
    res.send({
        songs: 'Kanye'
    })
})



app.listen(8000, function () {
    console.log('NOW LISTENING ON PORT 8000')
})