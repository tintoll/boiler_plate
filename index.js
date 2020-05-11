const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const config = require('./config/key')

const { User } = require('./models/User')

// application/x-www-form-urlencoded 형식을 분석하기 위해 추가 
app.use(bodyParser.urlencoded({extended: true}))
// apllication/json 형식을 분석하기 위해 추가 
app.use(bodyParser.json())

// mongdb 연결
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false
}).then( () => {
    console.log('MongoDB Conncted...')
}).catch( err => {
    console.log(err);
})


app.get('/', (req, res) => res.send('Hello World! 333'))
app.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save( (err, userInfo) => {
        if(err) return res.json({ success:false, err})
        return res.status(200).json({
            success : true
        })
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))