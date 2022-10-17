const express = require('express')
const Exercise = require('./../models/exercise')
const router = express.Router() 
const User = require('./../models/user')

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

//search user  from DB
router.post('/search',  async (req, res) => {
    console.log("inside server for searching")
    const search_c = req.body.username;
    console.log("search object", search_c)
    const searchResult = await User.find({ username: { $regex: search_c }});
    // const user = await Use.where("username").equals(input.username)
    console.log("search result ..", searchResult);

    res.redirect('../customer')  // hue ser ut själva sidan som innehåller usersinfo 
})

module.exports = router