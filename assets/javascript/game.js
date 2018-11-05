// game.js - this is the master game logic file.  It will house the "model logic" needed to support each of the screens
//         - it defines the global variables which are not screen specific.

// Character object
var character = {
    name     : "",
    tribe    : ""
} 

// active player on this application
var player = {
    loginName : "",
    active    : false,
    character : {}
}

// Notifications from the Firebase player add events should be pushed here -  array of Player {} objects
var players = [];

var round = {
    hero    : "",         // key field that matchies character.name in a hero array
    villain : ""          // key field that matches character.name in a villain array
}

// rounds[] - array of round {} objects,  keeps track of results during / between rounds, loads from firebase events
var rounds = []; 

// 'A' team hero characters loaded from firebase should be pushed here  - array of Character {} objects
var heroes = [ 
    "Avengers",
    "Black Panther",
    "Black Widow",
    "Captain America",
    "Cyclops",
    "Daredevil",
    "Deadpool",
    "Doctor Strange",
    "Drax",
    "Gamora",
    "Groot",
    "Guardians of the Galaxy",
    "Hawkeye ", 
    "Howard the Duck",
    "Hulk",
    "Human Torch",
    "Invisible Woman",
    "Iron Man",
    "Mr. Fantastic",
    "Nick Fury",
    "Nova",
    "Professor X",
    "Punisher",
    "Rocket Raccoon",
    "Rogue",
    "Silver Surfer",
    "Spider-Man",
    "Star-Lord (Peter Quill)",
    "Thing",
    "Thor",
    "Wolverine",
    ];   

// 'B' team villan characters loaded from firebase should be pushed here - array of Character {} objects
var villains = [
    "Apocalypse",
    "Bucky",
    "Doctor Doom",
    "Doctor Octopus",
    "Dormammu",
    "Ego",
    "Galactus",
    "Juggernaut",
    "Kang",
    "Kingpin",
    "Lady Deathstrike",
    "Loki",
    "Maestro",
    "Magneto",
    "Mandarin",
    "Mystique",
    "Nebula",
    "Norman Osborn",
    "Omega Red",
    "Onslaught",
    "Red Skull",
    "Ronan",
    "Sabretooth",
    "Sentinel",
    "Thanos",
    "The Fury",
    "Toad",
    "Ultron",
    "Venom (Flash Thompson)" 
    ];
