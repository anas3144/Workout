const express = require('express')
const Exercise = require('./../models/exercise')
const router = express.Router() 

const isAuthTrainer = function (req, res, next) {
    if (req.session.isAuth && (req.session.usertype === 't')) {
        next()
    }
    else {
        res.redirect('login')
    }
}

//login
router.get('/', isAuthTrainer, (req, res) => {
    res.render('trainer')
})

//adds an exercise and description to the database
router.post('/addexercise', isAuthTrainer, async (req, res) => {
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