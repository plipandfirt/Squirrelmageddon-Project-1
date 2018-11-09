$(document).ready(function () {

    /***********************/
    /* DOCUMENT VARIABLES  */
    /***********************/
    var database = firebase.database();
    var users = database.ref().child('players');
    var playersRef = database.ref('players');
    var username = "Guest";
    var loggedIn = [];


    /*******************/
    /* EVENT HANDLERS  */
    /*******************/

    //----------------------
    // users.child_added()  - Looks in firebase and tells you who is logged in already, and pushes those name to an array.
    //----------------------
    users.on("child_added", function (childSnapshot) {
        var getUsers = childSnapshot.val().loginName
        loggedIn.push(getUsers);
    });


    //-----------------------
    // document.ready() code --  runs when the page loads,  not inside any other event !!!!
    //                       --  TBD: suggest moving this to the bottom of the file for clarity
    //-----------------------

    console.log(loggedIn);

    // JBOND
    // CODE BELOW WAS REMOVED AND THE BLOCK BELOW IT ADDED
    // CHECK WITH CHRIS TO SEE IF THIS IS EXPECTED TO BE REUSED ON NEXT GAME
    // if a player exists in local storage - display them in the #loggedIn div
    // if (sessionStorage.getItem("player")){
    //     player = JSON.parse(sessionStorage.getItem('player'));
    //     $("#loggedIn").html("<h5>Currently logged in as: " + "<strong>" + player.loginName + "</strong>" + "</h5>");
    // }

    // start out displaying a message for the user to add their player name
    $("#loggedIn").html("<h5>Enter your Player name to get started.");

    //--------------------- end document.ready() code!!! ------------------


    /***********************/
    /* MORE EVENT HANDLERS */
    /***********************/

    //----------------------------
    // submitButton.click event() - Runs when user clicks submit button
    //----------------------------
    $("#submitButton").click(function () {
        username = capitalize($("#loginName").val().trim());
        if ($("#loginName").val().trim() !== "" && loggedIn.indexOf(username) === -1) {
            $("#loginName").hide();
            $("#submitButton").hide();
            $("#player").html("Thank you " + '<strong>' + username + '</strong>' + " for logging into Super Hero Hot or Not!")
            logUserToFirebase();
            setTimeout(function () {
                selectPage();
            }, 1000);
        } else if ($("#loginName").val().trim() === "") {
            $('#blankModal').modal("show");
        } else {
            $("#takenModal").modal("show");
        }

    });

    //----------------------------
    // loginName.keypress()  - listener for 'enter' in login name input
    //----------------------------
    $("#loginName").keypress(function (e) {
        if (e.keyCode === 13) {
            username = capitalize($("#loginName").val().trim());

            if ($("#loginName").val().trim() !== "" && loggedIn.indexOf(username) === -1) {
                $("#loginName").hide();
                $("#submitButton").hide();
                $("#player").html("Thank you " + '<strong>' + username + '</strong>' + " for logging into Super Hero Hot or Not!")
                logUserToFirebase();
                setTimeout(function () {
                    selectPage();
                }, 1000);
            } else if ($("#loginName").val().trim() === "") {
                $('#blankModal').modal("show");
            } else {
                $("#takenModal").modal("show");
            }
        }
    });

    // MBG Note:  submit button and keypress handlers look like prime opportunity for some DRY refactoring


    /*********************/
    /* HELPER FUNCTIONS  */
    /*********************/

    //----------------------------
    // Function to capitalize usernames
    //----------------------------
    function capitalize(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    //----------------
    // logUserToFirebase() - save the login information and push the player to Firebase
    //----------------
    function logUserToFirebase() {
        // update our global player object
        player.loginName = username;
        player.time = moment().format("X");
        player.status = "active";
        player.character = {};
        player.character.name = "";
        player.character.tribe = "";
        player.fbkey = "";

        // save to Firebase but make note of the key!
        playersRef.push(player)
        .then((snapshot) => {
            // save this key in the player object and pass it on to session storage
            player.fbkey = snapshot.key;
            console.log("Captured firebase key " + player.fbkey + " for user " + player.loginName);

            // we want to be sure we have the key before we do the session storage write
            // this block was called asynchronously by firebase so we can't guarantee the timing
            // outside of this block.
            setUserToSessionStorage();
        });

    }

    //----------------
    // selectPage() - (if login name submit is successful,) redirect the user to the select character page
    //----------------
    function selectPage() {
        document.location.href = 'Select.html';
    }

    //----------------
    // setUserToSessionStorage() - save the entered player name to the global plyer object and write it to sessionStorage()
    //----------------
    function setUserToSessionStorage() {
        // This should already be saved to the player object, but update the player name in the global object 
        // and write it to sessionStorage()
        player.loginName = username;

        // clear out the previous player entry and refresh it with the new login name 
        sessionStorage.clear();
        sessionStorage.setItem('player', JSON.stringify(player));
        $("#loggedIn").html("<h5>Currently logged in as: " + "<strong>" + username + "</strong>" + "</h5>");
    }


    /*************************************************************************/
    /*  PUT the desired non-declared document.ready() code here (see above) */
    /*************************************************************************/

    /* screen refresh elements that are not in event handlers (see comment above)  */

}); //end of document ready