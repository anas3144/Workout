const mongoose = require('mongoose')

const gymcalendarSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('GymCalendar', gymcalendarSchema)