const express = require('express')
const router = express.Router() 
var bcrypt = require('bcrypt')
const User = require('./../models/user')


//login
router.get('/', (req, res) => {
    if(req.session.isAuth){
        if(req.session.usertype === 'c'){
            res.redirect('../customer')
        }
        else if(req.session.usertype === 't'){
            res.redirect('../trainer')
        }
        else if(req.session.usertype === 'm'){
            res.redirect('../manager')
        }
        else{
            res.status(401).json({ error: "wrong usertype in auth"})
        }
    }
    else{
        res.render('login')
    }
})

//check if the user have right password
router.post('/check_validation', async (req, res) => {
    const user = await User.findOne({ username: req.body.username})
    var validpassword = false; 
    if(user){
        validpassword = await bcrypt.compare(req.body.password, user.password)
        if(validpassword === true){
            req.session.isAuth = true;
            req.session.username = user.username; 
            req.session.usertype = user.usertype;
            if(user.usertype === 'c'){
                res.redirect('../customer')
            }
            else if(user.usertype === 't'){
                res.redirect('../trainer')
            }
            else if(user.usertype === 'm'){
                res.redirect('../manager')
            }
        }
        else(
            res.status(401).json({ error: "wrong password"})
        )
    }
    else{
        res.status(401).json({ error: "user don't exist"})
    }
})

module.exports = router
