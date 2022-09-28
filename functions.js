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

function collect_exercise_and_description_old(){
    //take the value from the input tag
    let input_exercise = document.getElementById("inputfield_exercise").value
    let input_description = document.getElementById("inputfield_description").value
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:3000/addexercise?exe=${input_exercise}&des=${input_description}`, true );
    xmlHttp.send(null);
    return xmlHttp.responseText;
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
    let input_idnumber = document.getElementById("inputfield_idnumber").value
    let input_password = document.getElementById("inputfield_password").value
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:3000/check_validation?idnr=${input_idnumber}&password=${input_password}`, true );
    xmlHttp.send(null);
    return xmlHttp.responseText;
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

function save_client_information(){
    var username = document.getElementById("inputfield_username").value;
    var password = document.getElementById("generated_password").value;
    fetch('http://localhost:3000/save_customer', {
        method: 'POST',
        //tell that we are passing json
        headers: {
            'Content-Type': 'application/json'
        },
        //pass the data, fetchfunction do need the body to be stringify
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}