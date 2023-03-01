var express= require("express")
var router=express.Router()
var authService = require ("../users/authService")
router.post('/register', authService.register)
router.post('/login', authService.login)
module.exports= router