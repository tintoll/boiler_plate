const User = require('../models/User')

let auth = (req, res, next) => {
    // 인증 처리를 하는곳
    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth
    // 토큰을 복호화한후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth : false, error : true})

        // 요청값에 토큰과 사용자 정보를 넣어주어 router에서 값을 사용하기 위해서 
        req.token = token;
        req.user = user;

        next()
    })
}

module.exports = { auth }