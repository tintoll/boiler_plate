const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://boiler:admin0000@cluster0-gwjdb.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).then( () => {
    console.log('MongoDB Conncted...')
}).catch( err => {
    console.log(err);
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))