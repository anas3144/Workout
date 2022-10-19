const express = require('express')
const router = express.Router() 
const User = require('./../models/user')
const Comment = require('../models/comment')

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
    console.log("inside server_save_comment")
    username = {username: req.session.username};
    console.log(username)
    const new_comment = {comment: req.session.username + ": " + req.body.comment}
    var doc = await User.findOneAndUpdate(username, {$push: new_comment}, {
        new: true 
    });
    console.log("after update")
    console.log(doc)
    res.redirect('/customer')
})


//get comments from db
router.get('/comments_from_db', async (req, res) => {
    customer_name = req.session.username;
    const customer = await User.findOne({ username: customer_name})
    // console.log("inside comments_from_db")
    // console.log(customer)
    //console.log("inside server")
    const comments = customer.comment;
    //console.log('Comment:', {comments})
    res.send(JSON.stringify(comments));  
});


//save information from the calender into db 
router.post('/save_calender_info', async (req, res) => {
    console.log("inside save_calender_info server")
    // //search for user in schedule
    // const one_schedule = await Schedule.findOne({username: username})
    // //if it founds a schedule: update it
    // if(one_schedule){
    //     var doc = await User.findOneAndUpdate(username, {$push: new_calender_info}, {
    //     new: true 
    // }
    // const new_calender_info = {calenderinfo: date + ":" + "," +  data }
    const comment = new Comment({
        username: req.session.username,
        date: req.body.date,
        title: req.body.data
    })
    console.log(comment)
    try{
        await comment.save()
        res.redirect('/customer')
    }
    catch (error){
        console.log("could not save comment")
    }
})

router.get('/calenderinfo_from_db', async (req, res) => {
    console.log("inside comments_from_db")
    const comments = await Comment.find({username: req.session.username})
    console.log(comments)
    res.send(JSON.stringify(comments)); 
})

module.exports = router
