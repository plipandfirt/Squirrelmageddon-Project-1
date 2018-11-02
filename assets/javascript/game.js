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
var heros = [];   

// 'B' team villan characters loaded from firebase should be pushed here - array of Character {} objects
var villains = [];

// rounds[] - array of round {} objects,  keeps track of results during / between rounds, loads from firebase events
var rounds = []; 
