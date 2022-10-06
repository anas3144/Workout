//create express server and set up the server
const express = require('express'); 
//database
const mongoose = require('mongoose')


//user router that is created in users.js
//Routers
const loginRouter = require('./routes/login') 
const managerRouter = require('./routes/manager')
const trainerRouter = require('./routes/trainer')
const app = express(); 

//sessions
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoURL = 'mongodb://localhost/gymdb'





 
const port = process.env.PORT || 3000; 
const path = require('path');
app.listen(port, () => console.log('listening on port:', port));


app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))



//connect to db
mongoose.connect(mongoURL, {
    useNewUrlParser: true, 
    //useCreateIndex: true,
    useUnifiedTopology: true
})
.then((res) => {
    console.log("MongoDB Connected");
})


//sessions DB
const store = new MongoDBSession({
    uri: mongoURL, 
    collection: 'mySessions',
})

//Sessions - set the session to our req-object
app.use(session({
    secret: 'hej',
    saveUninitialized: false,
    resave: false,
    store: store,
}));

//req.session.isAuth - set the coookie in the browser
//req.session.id - match up with the id in the cookie



const User = require('./models/user')
const Exercise = require('./models/exercise')

//Routers
app.use('/login', loginRouter)
app.use('/manager', managerRouter)
app.use('/trainer', trainerRouter)

const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next()
    }
    else{
        res.redirect('login')
    }
}




// ****** HOMEPAGE ******
app.get('/', (req, res) => {
    // console.log(req.session);
    // req.session.isAuth = true
    // console.log(req.session);
    res.render('home')
});

// ****** JAVASCRIPTFILE: FUNCTIONS ******
app.get('/functions.js', (req, res, next) => {
    var options = {
        root: path.join(__dirname)
    }
    var fileName = "functions.js";
    res.sendFile(fileName, options, function (err){
        if (err){
            next(err);
        }
        else{
            console.log("Sent:", fileName);
        }
    })
});


// ****** LOGIN PAGE ******
// app.get('/login', (req, res) => {
//     res.render('login2')
// })


// app.post('/check_validation', (req, res, next) => {
//     console.log("inside server")
//     var username= req.body.username;
//     var password = req.body.password;
//     console.log(username)
//     console.log(password)
//     var html_file = ""; 
//     var usertype = "";
//     db["users"].forEach(user => {
//         if(user["username"] === username && user["password"] === password){
//             usertype = user["usertype"]
//             req.session.regenerate(function (err){
//                 if(err){
//                     console.log("error")
//                 }
//                 var newUserInfo = Object.assign(username, usertype); 
//                 req.session.usertype = usertype; 
//                 res.json(newUserInfo); 
//                 next();
//             });
//         }
//         else{
//             res.status(401).json({error: true, message: "User/password error"});
//             return; 
//         }
//     })

// })


// ****** CUSTOMER PAGE ******
// app.get('/customer',(req, res) => {
//     var options = {
//         root: path.join(__dirname)
//     }
//     var fileName = "customer.html"
//     res.sendFile(fileName, options, function (err){
//         if (err){
//             next(err);
//         }
//         else{
//             console.log("Sent:", fileName);
//         }
//     })
// })


// ****** MANAGER PAGE ******
// app.get('/manager', (req, res) => {
//     res.render('manager')
// })

// app.post('/saveuser', async (req, res) => {
//     const user = new User({
//         username: req.body.username, 
//         password: req.body.password,
//         usertype: req.body.usertype
//     })
//     try{
//         user = await user.save() //gives an id for the user
//         res.redirect(`/manager`)
//     } catch (err){
//         res.render('login')
//     }
    
// })
