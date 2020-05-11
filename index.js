const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
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

app.post('/login', (req, res) => {
    // 로그인 이메일 있는지 확인
    User.findOne({ email : req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess : false,
                message : '해당 이메일의 사용자가 존재하지 않습니다.'
            })
        }

        // 비밀번호가 정확한지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) {
                return res.json({
                    loginSuccess : false,
                    message : '비밀번호가 잘못되었습니다'
                })
            }
            // 토큰 생성 
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err)

                // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
                // 쿠키를 사용하려면 cookieParser가 필요 
                res.cookie('x_auth', user.token)
                   .status(200)
                   .json({
                        loginSuccess : true,
                        userId : user._id
                   })

            })    
        })
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))