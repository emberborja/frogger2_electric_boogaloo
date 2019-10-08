// Set score variables
// currentScore is used to ensure you only gain points when you reach a
// new max row, it's a running total at any point and can decrement.
var score = 0;
var currentScore = 0;
var highScore = 0;
if (window.localStorage["highScore"]) {
  highScore = localStorage["highScore"];
}

var lives = 3;

export { score, currentScore, highScore, lives };
