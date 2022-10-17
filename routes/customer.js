const express = require('express')
const router = express.Router() 
const User = require('./../models/user')

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
    console.log(customer)
    console.log("inside server")
    const comments = customer.comment;
    console.log('Comment:', {comments})
    res.send(JSON.stringify(comments));  
});


// search user by usernamename -> /getuser/:id ? to see only one record ?
router.post('/getuser', async (req, res) => {
    let find_user = req.body.find_user.trim()
    console.log(find_user)
    let search = await User.findOne({ username: find_user.username }).exec()

    res.send({ find_user: search })
})

module.exports = router
