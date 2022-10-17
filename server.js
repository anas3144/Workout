
//create express server and set up the server
const express = require('express'); 
//database
const mongoose = require('mongoose')
const app = express(); 

 
const port = process.env.PORT || 3000; 
const path = require('path');
app.listen(port, () => console.log('listening on port:', port));


app.use(express.json())
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))


//Routers
const loginRouter = require('./routes/login') 
const managerRouter = require('./routes/manager')
const trainerRouter = require('./routes/trainer')
const customerRouter = require('./routes/customer')


//sessions
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoURL = 'mongodb://localhost/gymdb'


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
    secret: ' ',
    saveUninitialized: false,
    resave: false,
    store: store,
}));

const User = require('./models/user')
const Exercise = require('./models/exercise');
const { db } = require('./models/user');
const { cp } = require('fs');

//Routers
app.use('/login', loginRouter)
app.use('/manager', managerRouter)
app.use('/trainer', trainerRouter)
app.use('/customer', customerRouter)




// ****** HOMEPAGE ******
app.get('/', (req, res) => {
    res.render('startpage')
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

app.get('/schedule.js', (req, res, next) => {
    var options = {
        root: path.join(__dirname)
    }
    var fileName = "schedule.js";
    res.sendFile(fileName, options, function (err){
        if (err){
            next(err);
        }
        else{
            console.log("Sent:", fileName);
        }
    })
});

// ****** FETCH FROM DB ****** 
app.get('/exercises_from_db', async (req, res) => {
    console.log("inside server")
    const exercises = await Exercise.find({});
    console.log('Exercise:', {exercises})
    res.send(JSON.stringify(exercises));  
});

app.get('/logout', (req, res) => {
    req.session.destroy(); 
    return res.redirect('/')
    
})

app.get('/setup', (req, res) => {
    res.render('setup')
})
