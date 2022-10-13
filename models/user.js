const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    usertype:{
        type: String
    },
    comment:
        {
            type: Array
        }
})

module.exports = mongoose.model('User', userSchema)
//have a tabel in our db called user, with the different colums specified 
//for it