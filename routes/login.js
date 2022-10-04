const express = require('express')
const router = express.Router() 
var bcrypt = require('bcrypt')
const User = require('./../models/user')

//login
router.get('/', (req, res) => {
    res.render('login')
})

router.get('/check_validation', async (req, res) => {
    console.log("inside login server")
    const user = await User.findOne({ username: req.query.username})
    console.log(user)
    console.log(user.password)
    if(user){
        bcrypt.compare(req.query.password, user.password, function(err, result){
            if(result){
                console.log("correct password")
                console.log(user.usertype)
                if(user.usertype === 'c'){
                    console.log("inside usertype c")
                    res.render('customer')
                }
                else if(user.usertype === 't'){
                    console.log("inside usertype t")
                    res.render('trainer')
                }
                else if(user.usertype === 'm'){
                    res.render('manager')
                }
            }
            else{
                res.status(401).json({ error: "wrong password"})
            }
        })
    }
    else{
        res.status(401).json({ error: "user don't exist"})
    }

})

module.exports = router


//for test
//q -> yYh8m9XiSJ -> saved as customer
//w -> *Q$vgUse(9 -> saved as trainer