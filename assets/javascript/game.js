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
    "Iron Man",
    "Black Panther",
    "Spider-Man",
    "Black Widow",
    "Rogue",
    "Wolverine",
    "Thor",
    "Daredevil",
    "Hulk",
    "Deadpool",
    "Captian America",
    "Doctor Strange",
    "Nick Fury",
    "Clint ",
    "Silver Surfer",
    "Punsiher",
    "Star-Lord",
    "Groot",
    "Gamora",
    "Rocket Raccon",
    "Drax the Destroyer",
    "Howard the Duck",
    "Supernova",
    "Professor X",
    "Cyclops",
    "Mister Fantastic",
    "Human Torch",
    "Thing",
    "Invisible Girl"
    ];   

// 'B' team villan characters loaded from firebase should be pushed here - array of Character {} objects
var villains = [
    "Venom",
    "Magneto",
    "Loki",
    "Thanos",
    "Mystique",
    "Ultron",
    "Lady Deathstrike",
    "Red Skull",
    "Viper",
    "Juggernaut",
    "Nebula",
    "Ronan",
    "Ego",
    "Yondu",
    "Collector",
    "Toad",
    "Apocalypse",
    "Galactus",
    "Kingpin",
    "Doctor Octopus",
    "Doctor Doom",
    "Norman Osborn",
    "Kang",
    "Dormammu",
    "Mandarin"
    ];

// rounds[] - array of round {} objects,  keeps track of results during / between rounds, loads from firebase events
var rounds = []; 

