// ****** TRAINER PAGE ******

//take the input from the textboxes
function save_exercise_and_description(){
    //take the value from the input tag
    let input_exercise = document.getElementById("inputfield_exercise").value;
    let input_description = document.getElementById("inputfield_description").value;
    console.log(input_exercise);
    console.log(input_description);
    fetch('http://localhost:3000/addexercise', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            exercise: input_exercise,
            description: input_description
        })
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}


//fetch data from json-fil about exercises 
function show_exercises_and_descriptions(){
    fetch('exercises_from_json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        append_data(data);
    
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}

//show data about exercises
function append_data(data) {
    var container = document.getElementById("exercises_to_display");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = 'Exercise: ' + data[i].exercisename+ ' ' + 'Description:' + data[i].description;
        container.appendChild(div);
    }
}








// ****** LOGIN ******

function check_validation(){
    let input_username = document.getElementById("inputfield_username").value
    let input_password = document.getElementById("inputfield_password").value
    console.log("inside CV")
    console.log(input_username)
    console.log(input_password)
    fetch('http://localhost:3000/check_validation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username : input_username,
            password: input_password
        })
    })
    .then(function (response) {
        console.log(response);
        //check_usertype();
    })
    .then(function (data) {
        console.log(data)    
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}










// ****** MANAGER ******

//math.floor -> rounds down and return the largest integer
//math.random -> returns floating point
function generate_password(){
    var chars= "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var password_length = 10; 
    var password = "";
    for(var i = 0; i < password_length; i++){
        var random_nr = Math.floor(Math.random() * chars.length); 
        password += chars.charAt(random_nr);
    } 
    console.log(password);
    document.getElementById("generated_password").value = password; 
}

function save_user_information(number){
    var username = document.getElementById("inputfield_username").value;
    var password = document.getElementById("generated_password").value;
    var usertype = number;
    fetch('http://localhost:3000/save_user', {
        method: 'POST',
        //tell that we are passing json
        headers: {
            'Content-Type': 'application/json'
        },
        //pass the data, fetchfunction do need the body to be stringify
        body: JSON.stringify({
            username: username,
            password: password,
            usertype: usertype
        })
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}