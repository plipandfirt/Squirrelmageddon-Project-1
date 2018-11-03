$(document).ready(function () {


    var database = firebase.database();
    var users = database.ref().child('players');
    var playersRef = database.ref('players');
    var username = "Guest";
    var loggedIn = [];

    // Looks in firebase and tells you who is logged in already, and pushes those name to an array.
    users.on("child_added", function (childSnapshot) {
    var getUsers = childSnapshot.val().loginName
    loggedIn.push(getUsers);
    });


    $("#submitButton").click(function () {

        if ($("#loginName").val().trim() !== "") {
            username = capitalize($("#loginName").val().trim());
        }
        if (loggedIn.indexOf(username) > 0){
            alert("this login Name is taken , please choose another!")
        }
        else{
            $("#loginName").hide()
            $("#loginName").hide()
            $("#submitButton").hide()
            $("#loginConfirm").html("Thank you " + '<strong>' + username + '</strong>' + " for logging into Hot or Not")
            userlog();
        }
        
    });

    // listener for 'enter' in login name input
    $("#loginName").keypress(function (e) {

        if (e.keyCode === 13 && $("#loginName").val().trim() !== "") {
            username = capitalize($("#loginName").val().trim());
            $("#loginName").hide()
            $("#submitButton").hide()
            $("#loginConfirm").html("Thank you " + '<strong>' + username + '</strong>' + " for logging into Hot or Not")
            userlog();
        }


    });

    // Function to capitalize usernames
    function capitalize(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }



    function userlog() {
        playersRef.push({
            loginName: username,
            time: firebase.database.ServerValue.TIMESTAMP,
            active: "true"
        });
    }






}); //end of document ready