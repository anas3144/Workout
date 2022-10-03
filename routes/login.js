const express = require('express')
const router = express.Router() 
var bcrypt = require('bcrypt')
const User = require('./../models/user')

//login
router.get('/', (req, res) => {
    res.render('login')
})

router.post('/check_validation', async (req, res) => {
    console.log("inside login server")
    const user = await User.findOne({ username: req.body.username})
    console.log(user)
    if(user){
        
    }
    else{
        res.status(401).json({ error: "user don't exist"})
    }

})

module.exports = router


//for test
//q -> yYh8m9XiSJ -> saved as customer
//w -> *Q$vgUse(9 -> saved as trainer