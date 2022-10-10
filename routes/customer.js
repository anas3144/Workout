const express = require('express')
const router = express.Router() 

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



module.exports = router



//for test
//q -> yYh8m9XiSJ -> saved as customer
//w -> *Q$vgUse(9 -> saved as trainer
//m -> Vzs#uU@hiK -> manager 