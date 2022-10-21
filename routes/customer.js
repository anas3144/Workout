const express = require('express')
const router = express.Router() 
const User = require('./../models/user')
const GymCalendar = require('../models/gymcalendar')


const isAuthCustomer = function (req, res, next) {
    if (req.session.isAuth && (req.session.usertype === 'c' || req.session.usertype === 't')) {
        next()
    }
    else {
        res.redirect('login')
    }
}
 

// /customer
router.get('/', isAuthCustomer, (req, res) => {
    res.render('customer')
})


// save a comment in a user
router.post('/save_comment', async (req, res) => {
    username = {username: req.session.username};
    const new_comment = {comment: req.session.username + ": " + req.body.comment}
    await User.findOneAndUpdate(username, {$push: new_comment}, {
        new: true 
    });
    res.redirect('/customer')
})


//get comments from db
router.get('/comments_from_db', async (req, res) => {
    customer_name = req.session.username;
    const customer = await User.findOne({ username: customer_name})
    const comments = customer.comment;
    res.send(JSON.stringify(comments));  
});


//save information from the calender into db 
router.post('/save_calender_info', async (req, res) => {
    const gymcalendar = new GymCalendar({
        username: req.session.username,
        date: req.body.date,
        title: req.body.data
    })
    try{
        await gymcalendar.save()
        res.redirect('/customer')
    }
    catch (error){
        console.log("could not save comment")
    }
})

//get calenderinfo from db
router.get('/calenderinfo_from_db', async (req, res) => {
    const comments = await GymCalendar.find({username: req.session.username})
    res.send(JSON.stringify(comments)); 
})

//deletes a comment in the calender
router.post('/delete_calenderinfo',  async (req, res) => {
    const data = {date: req.body.date, username: req.session.username}
    await GymCalendar.findOneAndDelete(data)
    res.redirect('/customer') 
})

module.exports = router
