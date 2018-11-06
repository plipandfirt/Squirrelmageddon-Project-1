/********************/
/* Global Varialbes */
/********************/

// Firebase references
var database = firebase.database();
var playersRef = database.ref('players');
var gameRef = database.ref("games");

/********************/
/* Helper Functions */
/********************/

function getInGame() {

    // Creates key based on assigned player number
    playerRef = database.ref("/players/" + playerNum);

    // Creates player object. 'choice' is unnecessary here, but I left it in to be as complete as possible
    playerRef.set({
        name: username,
        wins: 0,
        losses: 0,
        choice: null
    });

    // On disconnect remove this user's player object
    playerRef.onDisconnect().remove();
}

//--------------------------------
// loadPlayerList(tblElem) - populates the screen element with a list of players from the global player array
//                           and their chosen tribes (hero or villain).
//                         - note it doesn't give away the actual character they chose 
//                         - will only display those players that are logged in as active
//                  <table>
//                      <thead> ... </thead>
//                      <tbody>     <-- presumably the passed table element
//                          <tr>    <--  new elements 
//                              <td class="player-item" data-name="John Doe"> John Doe </td>
//                              <td class="player-item" data-tribe="hero"> hero </td>
//                          </tr>
//                      </tbody>
//                  </table>
//--------------------------------
function loadPlayerList(tblElem) {

    tblElem.empty();
    for (var i = 0;
        (i < players.length); i++) {

        // ONLY DISPLAY ACTIVELY LOGGED IN PLAYERS!!
        if (player.active == true) {

            // Append the player's name 
            var tr = $("<tr>");
            var td = $("<td>");
            $(td).addClass("player-item");
            $(td).text(players[i].loginName);
            $(td).attr("data-name", players[i].loginName);
            tr.append(td);

            // Append the player's tribe
            td = $("<td>");
            $(td).addClass("player-item");
            $(td).text(players[i].character.tribe);
            $(td).attr("data-tribe", players[i].character.tribe);
            tr.append(td);

            // Append the player's status -- ready to play or not  (active only means logged in currently)
            var status = players[i].active == true ? "pending" : "ready";
            td = $("<td>");
            $(td).addClass("player-item");
            $(td).text(status);
            $(td).attr("data-status", status);
            tr.append(td);

            tblElem.append(tr);
        }
    }
}


//---------------------------
// displayChampion(title, field) - uses the passed parameter to run a query against the Marvel developer API and attached it to the passed field
//-----------------------------
function displayChampion(character, field) {

    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildMarvelQueryURL(character);

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("--------- displayChampion() response data ------------");
        console.log(response);
        console.log("----------------------------------------------------------");

        // TO-DO:  Attach details from response to the div element here
        var name = response.data.results[0].name;
        var thumbnail = response.data.results[0].thumbnail.path;
        thumbnail += "." + response.data.results[0].thumbnail.extension;

        // Replace the displayed card with the new movie
        var screenElem = $("#" + field);
        screenElem.empty();
        screenElem.append($("<p>").text(name));

        var img = $("<img>");
        img.attr("src", thumbnail);
        img.attr("height", "300px");
        img.attr("alt", name);
        img.addClass("rounded");
        screenElem.append(img);
    });
}

$(document).ready(function () {

    // if a player exists in local storage - display them in the #loggedIn div
    if (localStorage.getItem("player")){
        console.log();
        $("#loggedIn").html("<h5>Currently logged in as: " + "<strong>" + localStorage.getItem("player") + "</strong>" + "</h5>");
    }

    /******************/
    /* Event Handlers */
    /******************/

    //-----------------------------
    // on player added event() -- updates the player array with active players
    //-----------------------------
    playersRef.on("child_added", function (data, prevChildKey) {

        var player = {
            character: {
                tribe: "hero",
                name: "Avengers"
            }
        }; // default data
        var newPlayer = data.val();
        player.loginName = newPlayer.loginName;
        player.active = newPlayer.active;

        // Make sure we have some default data if none is provided
        if (newPlayer.character) {
            // Look for a tribe
            if (newPlayer.character.tribe)
                player.character.tribe = newPlayer.character.tribe;

            // Look for a selected champion
            if (newPlayer.character.name)
                player.character.name = newPlayer.character.name;
        }
        players.push(player);

        console.log("---- player added to players array ----");
        console.log(player);
        console.log("---------------------------------------");

        var tableElem = $("#players-tbl");
        loadPlayerList(tableElem);
    });


    //------------------------------
    // Player ref onValue() event - gets the full complement of players in the game and sorts them by heros and villains
    //------------------------------
    playersRef.on("value", function (snapshot) {

        // length of the 'players' array
        var currentPlayers = snapshot.numChildren();
        console.log("on value Players() - numChildren = ", currentPlayers);
    });


    //------------------------------
    // Hero OnClick() event - user selected a Hero,  update the game record and pass the turn to the next player
    //------------------------------
    $(document).on("click", "#hero-img", function(event) {
        $(this).addClass("border border-success");
        $("#villain-img").removeClass("border border-success");
    });

    //------------------------------
    // Villain OnClick() event - user selected a Hero,  update the game record and pass the turn to the next player
    //------------------------------
    $(document).on("click", "#villain-img", function(event) {
        $(this).addClass("border border-success");
        $("#hero-img").removeClass("border border-success");
    });


});