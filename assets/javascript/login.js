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
    console.log(loggedIn);



    // Runs when user clicks submit button
    $("#submitButton").click(function () {
        username = capitalize($("#loginName").val().trim());
        if ($("#loginName").val().trim() !== "" && loggedIn.indexOf(username) === -1) {
            $("#loginName").hide()
            $("#loginName").hide()
            $("#submitButton").hide()
            $("#player").html("Thank you " + '<strong>' + username + '</strong>' + " for logging into Super Hero Hot or Not!")
            userlog();
            setTimeout(function(){selectPage()}, 3000);
        }
        else if ($("#loginName").val().trim() === "") {
            alert("Please enter a login name")
        }
        else {
            alert("This username is taken, please choose another one")
            }
        
    });

    // listener for 'enter' in login name input
    $("#loginName").keypress(function (e) {
        if (e.keyCode === 13) {
            username = capitalize($("#loginName").val().trim());

            if ($("#loginName").val().trim() !== "" && loggedIn.indexOf(username) === -1) {
                $("#loginName").hide()
                $("#loginName").hide()
                $("#submitButton").hide()
                $("#player").html("Thank you " + '<strong>' + username + '</strong>' + " for logging into Super Hero Hot or Not!")
                userlog();
                setTimeout(function(){selectPage()}, 3000);
            }
            else if ($("#loginName").val().trim() === "") {
                alert("Please enter a login name")
            }
            else {
                alert("This username is taken, please choose another one")
                }
        }
    });

    // Function to capitalize usernames
    function capitalize(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    // function to grab put login information into Firebase
    function userlog() {
        playersRef.push({
            loginName: username,
            time: firebase.database.ServerValue.TIMESTAMP,
            active: "true"
        });
    }
    // if login name submit is successful, take user to select page
    function selectPage (){
        document.location.href = 'Select.html'
    }






}); //end of document ready