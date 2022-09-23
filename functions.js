function collect_exercise_and_description(){
    //take the value from the input tag
    let input_exercise = document.getElementById("inputfield_exercise").value
    let input_description = document.getElementById("inputfield_description").value
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:3000/addexercise?exe=${input_exercise}&des=${input_description}`, true );
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function show_exercises_and_descriptions(){
    fetch('exercises_from_json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
        console.log(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}

function appendData(data) {
    var mainContainer = document.getElementById("exercises_to_display");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = 'Exercise: ' + data[i].exercisename+ ' ' + 'Description:' + data[i].description;
        mainContainer.appendChild(div);
    }
}