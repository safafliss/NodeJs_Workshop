const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userAuth = new Schema ({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    }
}, {timestamps: true})

module.exports= mongoose.model("userAuth",userAuth)