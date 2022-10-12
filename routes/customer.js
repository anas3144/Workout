const express = require('express')
const router = express.Router() 
const User = require('./../models/user')

const isAuthCustomer = function (req, res, next) {
    if (req.session.isAuth && (req.session.usertype === 'c')) {
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


// 
// router.post('/save_comment', async (req, res) => {
//     console.log("inside server_save_comment")
//     const user = await User.find(req.session.username);
//     console.log(user)
//     const new_comment = {comment: req.body.comment}
//     var doc = await user.findOneAndUpdate(user, new_comment, {
//         new: true 
//     });
//     console.log("after update")
//     console.log(doc)
// })


module.exports = router



//for test
//q -> yYh8m9XiSJ -> saved as customer
//w -> *Q$vgUse(9 -> saved as trainer
//m -> Vzs#uU@hiK -> manager 