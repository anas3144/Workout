
// ****** MANAGER ******
//called when a manager adds a customer or trainer 
function save_user_information(number){
    var username = document.getElementById("inputfield_username").value;
    var usertype = number;
    console.log(username)
    console.log(usertype)
    fetch('http://localhost:3000/manager/save_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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
    let input_exercise = document.getElementById("inputfield_exercise").value;
    let input_description = document.getElementById("inputfield_description").value;
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
        window.location.href = response.url;
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}



//fetch data from db
function show_exercises_and_descriptions(){
    fetch('http://localhost:3000/exercises_from_db', {
        method: 'GET',   
        headers: {
            'Content-Type': 'application/json'
        },
    })       
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        append_data(data);
    
    })
    .catch(function (err) {
    });
}

//show data about exercises on html page
function append_data(data) {
    var container = document.getElementById("exercises_to_display");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = 'Exercise: ' + data[i].name+ ' ' + 'Description:' + data[i].description;
        container.appendChild(div);
    }
}


// ****** LOGIN/LOGOUT ******
function check_validation(){
    let input_username = document.getElementById("inputfield_username").value
    let input_password = document.getElementById("inputfield_password").value
    fetch('http://localhost:3000/login/check_validation', {
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
        window.location.href = response.url;
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}

function kill_session(){
    console.log("inside killsession")
    fetch('http://localhost:3000/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(function (response) {
        window.location.href = response.url;
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}


// ****** CUSTOMER ******
function save_comment(){
    var comment = document.getElementById("inputfield_comment").value;
    fetch('http://localhost:3000/customer/save_comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment: comment
        })
    })
    .then(function (response) {
        window.location.href = response.url;
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}

//SHOW COMMENTS ON THE CUSTOMER PAGE 
function show_comments(){
    fetch('http://localhost:3000/customer/comments_from_db', {
        method: 'GET',   
        headers: {
            'Content-Type': 'application/json'
        },
    })       
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        append_comments(data);
    
    })
    .catch(function (err) {
    });
}

//create div-block on html page with the comments
function append_comments(data) {
    var container = document.getElementById("comments_to_display");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = data[i];
        container.appendChild(div);
    }
}


// ****** MANAGER PAGE ******
// delete a record of  client/trainer
function deleteRecord(userName){
    console.log("inside delete user funciton")
    const inputname = document.getElementById("inputfield_delete").value;
    console.log(inputname);
    fetch('http://localhost:3000/manager/delete', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username : inputname

        })
    })
    .then(function (response) {
        return response.json();
        //window.location.href = response.url;
    })
    .then(function (data) {
        console.log("back in function")
        console.log(data)
    })
    .catch(function (err) {
    });
}


