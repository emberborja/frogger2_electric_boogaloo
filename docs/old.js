// Initialize canvas element
var game = document.getElementById("game");
var ctx = game.getContext("2d");
var newGameBtn = document.getElementById("newGameBtn");
var pressSpaceToContinue = document.getElementById("pressSpaceToContinue");

// Sets game speed by rendering a frame every xx milliseconds
var gameSpeed = 12;

pressSpaceToContinue.style.display = "none";
newGameBtn.style.display = "none";