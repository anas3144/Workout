
function validate(){

    var username = document.getElementById("username").Value;
    var password = document.getElementById("password").Value;
    if(username=="admin" && password =="admin"){
        alert("login succesfully:)");

    }
    else
    {
        alert("login failed:( Please contact gym");
    }

}