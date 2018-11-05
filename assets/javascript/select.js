/******************* */
//* Global Varialbes */
/******************* */

// Player's screen choices
var tribe = "hero"; // this belongs in the active player object 
var activeCharChoiceElem = null; // keep track of the selected character to highlight

// Firebase references
var database = firebase.database();
var playersRef = firebase.database().ref("players/");
var users = playersRef.child('players');

/******************* */
/*  Helper functions */
/******************* */

//-------------------
// logPlayerChoices() - log the player's character selection to the database and local Storage
//-------------------
function logPlayerChoices() {


    // Log to database so other players are aware of our choice
    player.time = moment().format("X");
    player.active = true;

    // Log to local storage -- use for screen refreshes and downstream pages
    localStorage.setItem('player', JSON.stringify(player));

    // Log to database
    playersRef.push(player);
}

//-----------------------------
// updateCharacterList() - updates the screen with a list of hero or villain choices
//-----------------------------
function updateCharacterList() {

    // Updates the character list based on the radio button selection
    var charListElem = $("#character-tbl");
    var tribeChoice = getTribeChoice();

    if (tribeChoice === "villain") {
        loadVillainChoices(charListElem);
    } else {
        loadHeroChoices(charListElem);
    }
};

//-----------------------------
// getTribeChoice() - gets the hero or villain choice from the active player
//-----------------------------
function getTribeChoice() {
    return tribe;
}

//-----------------------------
// setTribeChoice() - sets the hero or villain choice from the active player
//-----------------------------
function setTribeChoice(choice) {

    // Update the title bar to reflect the tribe choice
    var tagElem = $("#hero-villian-tag");
    tagElem.text(choice);

    tribe = choice;
}

//-------------------------------
// loadHeroChoices() - populate the screen list with the array of Heros
//-------------------------------
function loadHeroChoices(listElem) {

    listElem.empty();
    for (var i = 0;
        (i < heroes.length); i++) {
        var li = $("<li>");
        $(li).addClass("list-group-item");
        $(li).addClass("character-choice");
        $(li).text(heroes[i]);
        $(li).attr("data-name", heroes[i]);
        listElem.append(li)
    }
}

//-------------------------------
// loadVillainChocies() - populate the array of villains
//-------------------------------
function loadVillainChoices(listElem) {

    listElem.empty();
    for (var i = 0;
        (i < villains.length); i++) {
        var li = $("<li>");
        $(li).addClass("list-group-item");
        $(li).addClass("character-choice");
        $(li).text(villains[i]);
        $(li).attr("data-name", villains[i]);
        listElem.append(li)
    }
}

/******************/
/* Click Handlers */
/******************/

$(document).ready(function () {

    //-----------------------------------
    // tribe button(s) event handler - handles updating the list of heros or villains based on the choice clicked
    $(".tribe-btn").on("click", function (event) {

        event.preventDefault();

        // Get the choice from the button selected
        var choice = $(this).attr("data-tribe");

        // Log our choice
        console.log("Tribe choice event() - ", choice);

        // Really this should be hooked off the active player tribev
        setTribeChoice(choice);

        // Refresh the selection list
        updateCharacterList();
    });

    //-----------------------------------
    // character choice click event () - updates the bio picture based on the selected character in the list
    //-----------------------------------
    $(document).on("click", ".character-choice", function (event) {

        // Prevent the form from refreshing the entire screen  
        event.preventDefault();

        // clear previous active choices
        if (activeCharChoiceElem)
            activeCharChoiceElem.removeClass("active");

        // save the active character selection and make it active (highlighted)
        activeCharChoiceElem = $(this);
        activeCharChoiceElem.addClass("active");

        // Get the choice from the button selected
        var choice = $(this).attr("data-name");

        console.log("character-choice event() - ", choice);

        // Update the biography pic & data
        performMarvelSearch(choice);
    });

    //------------------------------------
    // ready button on click event() -  record the player choices and redirect to the round start screen
    //------------------------------------
    $(document).on("click", "#ready-btn", function (event) {

        // Prevent the form from refreshing the entire screen  
        event.preventDefault();

        // save the player's tribe & character choice
        player.character.tribe = tribe;

        if (activeCharChoiceElem)
            player.character.name = activeCharChoiceElem.attr("data-name");
        else
            player.character.name = "Hulk";

        // write the choices to firebase to update the other users players[] array
        logPlayerChoices();

        // finally, send them to the game start page
        // similar behavior as an HTTP redirect
        window.location.replace("round.html");
    });

    playersRef.on("child_added", function (data, prevChildKey) {

        var player = {};
        var newPlayer = data.val();
        player.loginName =  newPlayer.loginName;
        player.active = newPlayer.active;
        // player.character.tribe = newPlayer.character.tribe;
        // player.character.name = newPlayer.character.name; 
        players.push(player);

        console.log("---- player added to players array ----");
        console.log(player);
        console.log("---------------------------------------");
    });


    /////////////////////////
    // SCREEN LOAD LOGIC - Update the screen with the latest 
    /////////////////////////
    player.loginName = "Mike"; // TBD - get this from the login screen
    updateCharacterList();
    performMarvelSearch("Deadpool");
});