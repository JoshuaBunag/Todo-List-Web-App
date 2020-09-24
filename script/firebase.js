function signin(){

    var uEmail = document.getElementById("uEmail").value;
    var uPass = document.getElementById("uPass").value;
  
    firebase.auth().signInWithEmailAndPassword(uEmail, uPass).then((success) => {
            setTimeout(function(){
                window.location.replace("./pages/todolist.html");
            }, 1000)
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}


