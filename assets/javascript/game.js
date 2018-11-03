// game.js - this is the master game logic file.  It will house the "model logic" needed to support each of the screens
//         - it defines the global variables which are not screen specific.

// Character object
var character = {
    name     : String,
    hero     : false
} 

var round = {
    hero : String,            // key field that matchies character.name in a hero array
    villain : String          // key field that matches character.name in a villain array
}

// Notifications from the Firebase player add events should be pushed here -  array of Player {} objects
var players = [];

// 'A' team hero characters loaded from firebase should be pushed here  - array of Character {} objects
var heroes = [ 
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
    "Hawkeye ", 
    "Howard the Duck",
    "Hulk",
    "Human Torch",
    "Invisible Woman",
    "Iron Man",
    "Mr. Fantastic",
    "Nick Fury",
    "Professor X",
    "Punisher",
    "Rocket Raccoon",
    "Rogue",
    "Silver Surfer",
    "Spider-Man",
    "Star-Lord", // need real name for Marvel API
    "Supernova",  // need working name for marvel API
    "Thing",
    "Thor",
    "Wolverine"
    ];   

// 'B' team villan characters loaded from firebase should be pushed here - array of Character {} objects
var villains = [
    "Apocalypse",
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
    "Magneto",
    "Mandarin",
    "Mystique",
    "Nebula",
    "Norman Osborn",
    "Red Skull",
    "Ronan",
    "Thanos",
    "Ultron",
    "Venom",  // need real name
    "Viper", // need real name
    "Yondu",// need real name
    "The Collector", // need working name
    "Toad"
    ];

// rounds[] - array of round {} objects,  keeps track of results during / between rounds, loads from firebase events
var rounds = []; 

