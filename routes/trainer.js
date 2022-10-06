const express = require('express')
const Exercise = require('./../models/exercise')
const router = express.Router() 


//login
router.get('/', (req, res) => {
    res.render('trainer')
})

router.post('/addexercise', async (req, res) => {
    console.log("inside addexercises")
    const exercise = new Exercise({
        name: req.body.exercise,
        description: req.body.description
    })
    try{
        user = await exercise.save() //gives an id for the user
        res.redirect(`/trainer`)
    } catch (err){
        res.render('trainer')
    }
 
})



module.exports = router