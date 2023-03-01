const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'abc123')

        req.userAuthh = decode
        next()
    }
    catch(error){
        res.json({
            message: 'Authentication failed!'   
        })
    }
}

module.exports = authenticate