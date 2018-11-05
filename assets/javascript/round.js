$(document).ready(function () {

    /********************/
    /* Global Varialbes */
    /********************/

    // Firebase references
    var database = firebase.database();
    var playersRef = database.ref('players');

    /********************/
    /* Helper Functions */
    /********************/
    function loadPlayerList(listElem) {

        listElem.empty();
        for (var i = 0;
            (i < players.length); i++) {

            var li = $("<li>");
            $(li).addClass("list-group-item");
            $(li).addClass("player-item");
            $(li).text(players[i].loginName);
            $(li).attr("player-name", players[i].loginName);
            listElem.append(li);
        }
    }


    /******************/
    /* Event Handlers */
    /******************/

    // on player added event() -- updates the player array with active players
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

        var tableElem = $("#players-tbl");
        loadPlayerList(tableElem);
    });
});