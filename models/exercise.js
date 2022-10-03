const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Exercise', exerciseSchema)
//have a tabel in our db called user, with the different colums specified 
//for it