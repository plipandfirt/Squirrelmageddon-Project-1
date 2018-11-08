// game.js - this is the master game logic file.  It will house the "model logic" needed to support each of the screens
//         - it defines the global variables which are not screen specific.

// Character object
var character = {
    name: "",
    tribe: ""
}

// active player on this application
var player = {
    loginName: "",
    active: false,
    character: {
        name: "",
        tribe: ""
    },
    fbkey: ""
}

// Notifications from the Firebase player add events should be pushed here -  array of Player {} objects
var players = [];

var round = {
    hero: "", // key field that matchies character.name in a hero array
    villain: "" // key field that matches character.name in a villain array
}

// rounds[] - array of round {} objects,  keeps track of results during / between rounds, loads from firebase events
var rounds = [];

// 'A' team hero characters loaded from firebase should be pushed here  - array of Character {} objects
//  Requires two different names because Marvel API expects a different name than Wikipedia's API
// TBD - add firebase load to empty/replace these static values
var heroes = [{
        name: "Avengers",
        wiki: "Avengers (comics)"
    },
    {
        name: "Black Panther",
        wiki: "Black Panther (comics)"
    },
    {
        name: "Black Widow",
        wiki: "Black Widow (Natasha Romanova)"
    },
    {
        name: "Captain America",
        wiki: "Captain America"
    },
    {
        name: "Cyclops",
        wiki: "Cyclops (Marvel Comics)"
    },
    {
        name: "Daredevil",
        wiki: "Daredevil (Marvel Comics character)"
    },
    {
        name: "Deadpool",
        wiki: "Deadpool"
    },
    {
        name: "Doctor Strange",
        wiki: "Doctor Strange"
    },
    {
        name: "Drax",
        wiki: "Drax the Destroyer"
    },
    {
        name: "Gamora",
        wiki: "Gamora"
    },
    {
        name: "Groot",
        wiki: "Groot"
    },
    {
        name: "Guardians of the Galaxy",
        wiki: "Guardians of the Galaxy (2008 team)"
    },
    {
        name: "Hawkeye ",
        wiki: "Hawkeye (comics)"
    },
    {
        name: "Howard the Duck",
        wiki: "Howard The Duck"
    },
    {
        name: "Hulk",
        wiki: "Hulk (comics)"
    },
    {
        name: "Human Torch",
        wiki: "Human Torch"
    },
    {
        name: "Invisible Woman",
        wiki: "Invisible Woman"
    },
    {
        name: "Iron Man",
        wiki: "Iron Man"
    },
    {
        name: "Mr. Fantastic",
        wiki: "Mister Fantastic"
    },
    {
        name: "Nick Fury",
        wiki: "Nick Fury"
    },
    {
        name: "Nova",
        wiki: "Nova (Richard Rider)"
    },
    {
        name: "Professor X",
        wiki: "Professor X"
    },
    {
        name: "Punisher",
        wiki: "Punisher"
    },
    {
        name: "Rocket Raccoon",
        wiki: "Rocket Racoon"
    },
    {
        name: "Rogue",
        wiki: "Rogue (comics)"
    },
    {
        name: "Silver Surfer",
        wiki: "Silver Surfer"
    },
    {
        name: "Spider-Man",
        wiki: "Spider-Man"
    },
    {
        name: "Star-Lord (Peter Quill)",
        wiki: "Star-Lord"
    },
    {
        name: "Thing",
        wiki: "Thing (comics)"
    },
    {
        name: "Thor",
        wiki: "Thor (Marvel Comics)"
    },
    {
        name: "Wolverine",
        wiki: "Wolverine (character)"
    }
];

// 'B' team villan characters loaded from firebase should be pushed here - array of Character {} objects
//  Requires two different names because Marvel API expects a different name than Wikipedia's API
// TBD - add firebase load to empty/replace these static values
var villains = [{
        name: "Apocalypse",
        wiki: "Apocalypse (Marvel Comics)"
    },
    {
        name: "Bucky",
        wiki: "Bucky Barnes"
    },
    {
        name: "Doctor Doom",
        wiki: "Doctor Doom"
    },
    {
        name: "Doctor Octopus",
        wiki: "Doctor Octopus"
    },
    {
        name: "Dormammu",
        wiki: "Dormammu"
    },
    {
        name: "Ego",
        wiki: "Ego the Living Planet"
    },
    {
        name: "Galactus",
        wiki: "Galactus"
    },
    {
        name: "Juggernaut",
        wiki: "Juggernaut (comics)"
    },
    {
        name: "Kang",
        wiki: "Kang the Conqueror"
    },
    {
        name: "Kingpin",
        wiki: "Kingpin (character)"
    },
    {
        name: "Lady Deathstrike",
        wiki: "Lady Deathstrike"
    },
    {
        name: "Loki",
        wiki: "Loki (comics)"
    },
    {
        name: "Maestro",
        wiki: "Maestro (comics)"
    },
    {
        name: "Magneto",
        wiki: "Magneto (comics)"
    },
    {
        name: "Mandarin",
        wiki: "Mandarin (comics)"
    },
    {
        name: "Mystique",
        wiki: "Mystique (comics)"
    },
    {
        name: "Nebula",
        wiki: "Nebula (comics)"
    },
    {
        name: "Norman Osborn",
        wiki: "Norman Osborn"
    },
    {
        name: "Omega Red",
        wiki: "Omega Red"
    },
    {
        name: "Onslaught",
        wiki: "Onslaught (comics)"
    },
    {
        name: "Red Skull",
        wiki: "Red Skull"
    },
    {
        name: "Ronan",
        wiki: "Ronan the Accuser"
    },
    {
        name: "Sabretooth",
        wiki: "Sabretooth (comics)"
    },
    {
        name: "Sentinel",
        wiki: "Sentinel (comics)"
    },
    {
        name: "Thanos",
        wiki: "Thanos"
    },
    {
        name: "The Fury",
        wiki: "Fury (Marvel Comics)"
    },
    {
        name: "Toad",
        wiki: "Toad (comics)"
    },
    {
        name: "Ultron",
        wiki: "Ultron"
    },
    {
        name: "Venom (Flash Thompson)",
        wiki: "Venom (Marvel Comics character)"
    }
];
