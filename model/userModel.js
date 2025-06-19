const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true,
        timestamps:true
    }, 
    password: {
        type: String,
        required: true,
        timestamps:true
    }
})

module.exports = mongoose.model('user', userSchema)