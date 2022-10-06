const express = require('express')
const router = express.Router() 
var bcrypt = require('bcrypt')
const User = require('./../models/user')


// const mongoose = require('mongoose')
// const session = require('express-session');
// const MongoDBSession = require('connect-mongodb-session')(session);
// const mongoURL = 'mongodb://localhost/gymdb'

// //connect to db
// mongoose.connect(mongoURL, {
//     useNewUrlParser: true, 
//     //useCreateIndex: true,
//     useUnifiedTopology: true
// })
// .then((res) => {
//     console.log("MongoDB Connected");
// })

// //sessions DB
// const store = new MongoDBSession({
//     uri: mongoURL, 
//     collection: 'mySessions',
// })

// router.use(session({
//     secret: 'hej',
//     saveUninitialized: false,
//     resave: false,
//     store: store,
// }));

//login
router.get('/', (req, res) => {
    res.render('login')
})

router.post('/test', (req, res) => {
    console.log(req.session);
    req.session.isAuth = true; 
    res.render('login')
})

router.post('/check_validation', async (req, res) => {
    console.log("inside login server")
    const user = await User.findOne({ username: req.body.username})
    console.log(user)
    console.log(user.password)
    var validpassword = false; 
    if(user){
        //bcrypt.compare(req.body.password, user.password, function(err, result){
        validpassword = await bcrypt.compare(req.body.password, user.password)
        if(validpassword === true){
            console.log(req.session);
            req.session.isAuth = true; 
            console.log(req.session);
        }
        else(
            res.status(401).json({ error: "wrong password"})
        )
    }
    else{
        res.status(401).json({ error: "user don't exist"})
    }
    res.render("./trainer")

})

module.exports = router


//for test
//q -> yYh8m9XiSJ -> saved as customer
//w -> *Q$vgUse(9 -> saved as trainer