$(document).ready(function() {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCE_Q_Xvlf03zMMkJEdHzvc1oI1MHA4W24",
        authDomain: "squirrelmageddon-e7c1c.firebaseapp.com",
        databaseURL: "https://squirrelmageddon-e7c1c.firebaseio.com",
        projectId: "squirrelmageddon-e7c1c",
        storageBucket: "squirrelmageddon-e7c1c.appspot.com",
        messagingSenderId: "107812475497"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var playersRef = database.ref("players");
    var username = "Guest";
    console.log(username);

    $("#submitButton").click(function () {
        if ($("#loginName").val().trim() !== "") {
            username = capitalize($("#loginName").val().trim());
            $("#loginName").hide()
            $("#loginName").hide()
            $("#submitButton").hide()
            $("#loginConfirm").text("Thank you " + username + " for logging into Hot or Not")
            userlog();
        }
        
    });

    // listener for 'enter' in login name input
    $("#submitButton").keypress(function (e) {
        if (e.keyCode === 13 && $("#loginName").val().trim() !== "") {
            username = capitalize($("#loginName").val().trim());
            $("#loginName").hide()
            $("#submitButton").hide()
            $("#loginConfirm").text("Thank you " + username + " for logging into Hot or Not")
            userlog();
        }
        
    });

    // Function to capitalize usernames
    function capitalize(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    function userlog (){

    }





    

}); //end of document ready