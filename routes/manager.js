const express = require('express')
const User = require('./../models/user')
const router = express.Router() 
var bcrypt = require('bcrypt')

//auth function - check that the user is auth and have the right usertype
const isAuthManager = function (req, res, next) {
    if (req.session.isAuth && (req.session.usertype === 'm')) {
        next()
    }
    else {
        res.redirect('login')
    }
}

// '/manager'
router.get('/', isAuthManager, (req, res) => {
    res.render('manager')
})

// '/manager/save_user'
router.post('/save_user', async (req, res) => {
    var password = generate_password()
    var hashpassword = ""
    const salt = await bcrypt.genSalt(10)
    hashpassword =  await bcrypt.hash(password, salt); 
    const user = new User({
        username: req.body.username, 
        password: hashpassword,
        usertype: req.body.usertype
    })
    try{
        user = await user.save() //gives an id for the user
        res.redirect(`/manager`)
    } catch (err){
        res.render('login')
    }
    
})

//math.floor -> rounds down and return the largest integer
//math.random -> returns floating point
//generates a password 
function generate_password(){
    var chars= "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var password_length = 10; 
    var password = "";
    for(var i = 0; i < password_length; i++){
        var random_nr = Math.floor(Math.random() * chars.length); 
        password += chars.charAt(random_nr);
    } 
    console.log("Generated password:")
    console.log(password);
    return password;  
}


// delete a user from DB
router.post('/delete',  async (req, res) => {
    await User.findOneAndDelete({ username:req.body.username });
    res.redirect('/manager') 
})

module.exports = router
