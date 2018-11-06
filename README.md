# Squirrelmageddon-Project-1 - Marvel Hot or Not
s
Project Description /Final Sketch:  Hot or Not Game based on Marvel Universe of Characters – Players choose a character from the universe of Marvel Characters.  Every character you look up will have a brief description of things about them, image, gifs, etc.  Voting will be done with multiple players (class).  Voting will be single elimination and go to the last character standing!  Final winning character will be displayed at an ending screen, more information about this character, what class members picked the winning character & also a leaderboard with winners logged?  

APIs to be used: Marvel API, OMDB API, Stretch goal – DC API (if something exists that is suitable)  

Alt APIs: Star Trek vs Star Wars (instead of Marvel vs DC)  

## Why Squirrelmaggedon?  
For anyone living in the New Hampshire area in the fall of 2018, you will know what we are referring to. The number of tragic squirrel roadkill during October was staggering and tragic.  Those poor little critters were flattened everywhere, on the highways and the by-ways. It only seemed fitting to give them a tribute as they lived their final hours looking for that ever elusive acorn. 

For our team, the persisence of the squirrel in their single-minded quest is the inspiration for this team. Here's to you Scrat, Rocket J. Squirrel (Rocky the Flying Squirrel), Sandy Cheeks and the rest. We will adopt your focus and ensure a quality sofware delivery of our imagining -- but yet always remember to look both ways before crossing the street!

## Rough Breakdown of Tasks:  
1.)    Character selection screen – search character by name / movie / comic / or Random button to generate a random marvel character
2.)    Voting selection screen – match up two random character – it is voted and the one with most votes is retained in a new array, loser is eliminated.  This continues until there is only one character
3.)    Winner screen – more information about winning character, who selected this character, and a leaderboard possibly.

## Getting Started
To get started, copy the program to a clean directory and run "index.html" in your browser.  The program is ready to start automatically.  It will present you with a lightweight login screen to ask you for a name to use during the game.  
  
## Prerequisites
A modern browser and an internet connection.  Chrome works best, but others should be fine too.  
A modern IDE - it was developed using Visual Studio Code, but any text editor awould work, including notepad.  
GitHub  
GitBash installed locally  
  
## Installing
1.  Find a Locate an empty directory on your hard drive  
2.  Open a bash terminal in that directory  
3.  Clone the unit-4-game repo down using  Git    
         "git clone https://github.com/plipandfirt/Squirrelmageddon-Project-1.git  
4.  Open index.html in your favorite browser  
        It should display the game login screen and prompt you for your name  
  
## Developer notes
index.html:  main entry point and user interface, minimal code is here, the dynamicism is all in the app.js
login.js -- captures the player's name at game start, called by index.html
select.js - allows the player to choose a tribve (hero / villain) and a character champion
round.js - displays the game results in realtime
marvel.js - API calls to developer.marvel.com to get character info and pics
firebase.js - google database configuration for persistent storage
game.js - master game objects used for consistency across pages, defines character choices for select screen
md5.js - hash function required to call the marvel api 
dc.js - wikipedia API to get the DC characters since DC doesn't have an API (yet?)

Firebase is used to manage all the multi-player state  
LocalStorage is used to track the current player's credentials  
Responsiveness - screens will react to limited viewports and collapose into scrollable columns

## Built With
jQuery 3.3.1 - JavaScript library   
Bootstrap 4.1.2 - Bootstrap library  
Moment JS 2.22.2 - Date/Time library  
   
## Authors
Laurie Anderson - plipandfirt
Jeff Bond - mycatbign  
Michael Galarneau - Five0fFour
Chris Gauthier - chrsgauthier5
  
## Acknowledgements
Marvel Developer Portal & API:  http://developer.marvel.com  
Message Digest Algorithm:  http://www.webtoolkit.info/    
Favicon:  ??