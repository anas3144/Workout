
// ****** MANAGER ******
//called when a manager adds a customer or trainer 
function save_user_information(number){
    var username = document.getElementById("inputfield_username").value;
    var usertype = number;
    fetch('http://localhost:3000/manager/save_user', {
        method: 'POST',
        //tells that we are passing json
        headers: {
            'Content-Type': 'application/json'
        },
        //pass the data, fetchfunction do need the body to be stringify
        body: JSON.stringify({
            username: username,
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


// ****** TRAINER PAGE ******

function save_exercise_and_description(){
    //take the value from the input tag
    console.log("inside save funciton")
    let input_exercise = document.getElementById("inputfield_exercise").value;
    let input_description = document.getElementById("inputfield_description").value;
    console.log(input_exercise);
    console.log(input_description);
    fetch('http://localhost:3000/trainer/addexercise', {
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
    fetch(`http://localhost:3000/login/check_validation?username=${input_username}&password=${input_password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify({
        //    username : input_username,
        //    password: input_password
        //})
    })
    .then(function (response) {
        response.json()
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}










