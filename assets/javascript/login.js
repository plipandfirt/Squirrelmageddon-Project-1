$(document).ready(function() {


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
            $("#loginConfirm").html("Thank you " + '<strong>' + username + '</strong>' + " for logging into Hot or Not")
            userlog();
        }
        
    });

    // listener for 'enter' in login name input
    $("#submitButton").keypress(function (e) {
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

    function userlog (){
            playersRef.push({
            loginName: username,
            time: firebase.database.ServerValue.TIMESTAMP,
            active: "true"
        });
    }





    

}); //end of document ready