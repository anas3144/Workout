//create express server
const express = require('express'); 
//set up the server
const app = express(); 
//choose port 
const port = process.env.PORT || 3000; 
const path = require('path');
app.listen(port, () => console.log('listening on port:', port));

//fetch is sending as a json
app.use(express.json())

//Create the db variable with a structure object = {}, array[]
var db = {"exercises": [], "users": []};
//include the filesystem module
const fs = require('fs');
//if the database file, db.json, already exist: read in the information into variable db
try {
    if (fs.existsSync('db.json')) {
        fs.readFile('db.json', function (error, content) {
            db = JSON.parse(content);
        });
    }
  } catch(err) {
  }


// ****** HOMEPAGE ******
app.get('/', (req, res) => {
    var options = {
        root: path.join(__dirname)
    }
    var fileName = "home.html";
    res.sendFile(fileName, options, function (err){
        if (err){
            next(err);
        }
        else{
            console.log("Sent:", fileName);
        }
    })
});

// ****** JAVASCRIPTFILE: FUNCTIONS ******
app.get('/functions.js', (req, res) => {
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
app.get('/login', (req, res) => {
    var options = {
        root: path.join(__dirname)
    }
    var fileName = "login.html";
    res.sendFile(fileName, options, function (err){
        if (err){
            next(err);
        }
        else{
            console.log("Sent:", fileName);
        }
    })
});

app.post('/check_validation', (req, res) => {
    console.log("inside server")
    var input_idnumber = req.body.username;
    var input_password = req.body.password;
    //for(i = 0; i < db.customers.length; i++){
   //     console.log(db.customers[i]);
    //}
    var options = {
        root: path.join(__dirname)
    }
    var fileName = "trainer.html";
    res.sendFile(fileName, options, function (err){
        if (err){
            next(err);
        }
        else{
            console.log("Sent:", fileName);
        }
    })

})



// ****** TRAINING PAGE ****** 
app.get('/trainer', (req, res) => {
    var options = {
        root: path.join(__dirname)
    }
    var fileName = "trainer.html"
    res.sendFile(fileName, options, function (err){
        if (err){
            next(err);
        }
        else{
            console.log("Sent:", fileName);
        }
    })
})

app.post('/addexercise', (req, res) => {
    var input_exercise = req.body.exercise;
    var input_description = req.body.description;
    console.log(input_exercise);
    console.log(input_description)
    //create an structure of a object exercise
    var exercise = {
        exercisename: input_exercise,
        description: input_description
    };
    //push the object into the variable db 
    db["exercises"].push(exercise);
    //write the db into the json file
    var data = JSON.stringify(db, null, 2);
    fs.writeFile('db.json', `${data}`, {flag: 'w'}, (err) => {
        if (err) throw err;
        console.log('Exercises added to file');
    })
});

app.get('/exercises_from_json', (req, res) => {
    res.send(JSON.stringify(db["exercises"]));
});

// ****** Manager page ******
app.get('/manager', (req, res) => {
    var options = {
        root: path.join(__dirname)
    }
    var fileName = "manager.html";
    res.sendFile(fileName, options, function (err){
        if (err){
            next(err);
        }
        else{
            console.log("Sent:", fileName);
        }
    })
});


app.post('/save_user', (req, res) => {
    console.log("inside server")
    var username = req.body.username;
    var password = req.body.password;
    var usertype = req.body.usertype;
    console.log(username);
    console.log(password);
    console.log(usertype);
    var customer = {
        username: username, 
        password: password,
        usertype: usertype 
    }
    console.log(customer);
    db["users"].push(customer);
    //write the db into the json file
    var data = JSON.stringify(db, null, 2);
    fs.writeFile('db.json', `${data}`, {flag: 'w'}, (err) => {
        if (err) throw err;
        res.send();
        console.log('user info added to file');
    })
});