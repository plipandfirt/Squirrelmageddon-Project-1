$(document).ready(function () {

    /******************* */
    //* Global Varialbes */
    /******************* */
    var tribe = "hero";                  // this belongs in the active player object 
    var activeCharChoiceElem = null;     // keep track of the selected character to highlight

    /******************* */
    /*  Helper functions */
    /******************* */

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
            $(li).attr("data-name",heroes[i]);
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
            $(li).attr("data-name",villains[i]);
            listElem.append(li)
        }
    }

    /**************** */
    /* Click Handlers */
    /**************** */

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
    $(document).on("click", ".character-choice", function(event) {

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

    /* Update the screen with the latest */
    updateCharacterList();
    performMarvelSearch("Hulk");

});