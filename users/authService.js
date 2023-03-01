const userAuth = require ('./authModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let userAuthh = new userAuth({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
        userAuthh.save()
        .then(userAuthh => {
            res.json({
                message: 'User Added Successfully!!'
            })
        })
        .catch(error =>{
            res.json({
                message: 'An error occured!'
            })
        })
    })
    
}

const login = (req, res, next) =>{
    var username = req.body.username
    var password = req.body.password
    userAuth.findOne({$or: [{email: username}, {phone:username}]})
    .then(userAuthh => {
        if(userAuthh){
            bcrypt.compare(password, userAuthh.password, function(err, result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({name: userAuthh.name}, 'abc123', {expiresIn:'1h'})
                    res.json({
                        message: 'Login Successful!',
                        token
                    })
                }else{
                    res.json({
                        message: 'Password does not match!'
                    })
                }
            })
        }else{
            res.json({
                message: 'No user found!'
            })
        }
    })
}
module.exports= {register, login}