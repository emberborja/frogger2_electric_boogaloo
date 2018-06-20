// Initialize canvas element
var game = document.getElementById('game');
var ctx = game.getContext('2d');
var newGameBtn = document.getElementById('newGameBtn');

// Include sprites
var sprites = new Image();
var deathSprite = new Image();
var gameOverSprite = new Image();

sprites.src = 'assets/frogger-sprites.png';
deathSprite.src = 'assets/skull-sprite.png'
gameOverSprite.src = 'assets/gameOverSprite.png';

// Set score variables
// currentScore is used to ensure you only gain points when you reach a
// new max row, it's a running total at any point and can decrement.
var score = 0;
var currentScore = 0;
var highScore = 0;
if (window.localStorage['highScore']) {
    highScore = localStorage['highScore'];
}

var lives = 3;

// Original Frog Size from Sprite Sheet
var frogWidth = 30;
var frogHeight = 22;

// Frog position
var frogX = 200;
var frogY = 530;
var facing = 'up';

var rowHeight = game.height/15;

// Sets game speed by rendering a frame every xx milliseconds
var gameSpeed = 30;

var logbreakpoint = [527, 621, 560];
var logstartpoint = [-87, -320, -553, -181, -508, -835, -120, -386, -652];

var breakpoint = [-27, 470, -30, 470, -50, -33, -33];

var startpoint1 = [440, -30, 440, -30, 440, 440, 440];
var startpoint2 = [613, -206, 616, -206, 636, 473, 473];
var startpoint3 = [759, -382, 792, -382, 832, 506, 506];


// moved desty , destwidth and destheight elements from Obstacle objects in obstacleArray
// to own arrays for easier manipulation
var desty = [490, 450, 410, 370, 330, 250, 210, 170, 130, 120];

//flags to check for occupied home spaces
var homeSpaceArray = [0,0,0,0,0];

var destwidth = [27, 30, 30, 30, 50, 33, 87, 181, 33, 120];

var destheight = [28, 23, 23, 27, 21, 25, 24, 24, 25, 24];


newGameBtn.style.display = 'none';
newGameBtn.onclick = newGame;







// OBSTACLES
// first row: purple yello car, right to left, slow [0]
// second row: bulldozer car, left to right, slow [1]
// third row: purple car, right to left, medium speed [2]
// fourth row: green and white car, left to right, medium speed [3]
// fifth row: freight truck car, right to left, fast [4]
// sixth row: turts x 3, slow [5]
// seventh row: small log, slow [6]
// eith row: large log, fast [7]
// ninth row: turts x 2, fast [8]
// tenth row: medium logs, medium speed [9]

var obstacleArray = [
    // road obstacles
    // car row 1
    new Obstacle(sprites, 80, 262, 27, 28, startpoint1[0], 490, 27, 28, 'from right to left', 'slow', breakpoint[0]),
    new Obstacle(sprites, 80, 262, 27, 28, startpoint2[0], 490, 27, 28, 'from right to left', 'slow', breakpoint[0]),
    new Obstacle(sprites, 80, 262, 27, 28, startpoint3[0], 490, 27, 28, 'from right to left', 'slow', breakpoint[0]),
    // car row 2
    new Obstacle(sprites, 70, 300, 30, 23, startpoint1[1], 450, 30, 23, 'from left to right', 'slow', breakpoint[1]),
    new Obstacle(sprites, 70, 300, 30, 23, startpoint2[1], 450, 30, 23, 'from left to right', 'slow', breakpoint[1]),
    new Obstacle(sprites, 70, 300, 30, 23, startpoint3[1], 450, 30, 23, 'from left to right', 'slow', breakpoint[1]),
    // car row 3
    new Obstacle(sprites, 10, 265, 30, 23, startpoint1[2], 410, 30, 23, 'from right to left', 'medium', breakpoint[2]),
    new Obstacle(sprites, 10, 265, 30, 23, startpoint2[2], 410, 30, 23, 'from right to left', 'medium', breakpoint[2]),
    new Obstacle(sprites, 10, 265, 30, 23, startpoint3[2], 410, 30, 23, 'from right to left', 'medium', breakpoint[2]),
    // car row 4
    new Obstacle(sprites, 45, 263, 30, 27, startpoint1[3], 370, 30, 27, 'from left to right', 'medium', breakpoint[3]),
    new Obstacle(sprites, 45, 263, 30, 27, startpoint2[3], 370, 30, 27, 'from left to right', 'medium', breakpoint[3]),
    new Obstacle(sprites, 45, 263, 30, 27, startpoint3[3], 370, 30, 27, 'from left to right', 'medium', breakpoint[3]),
    // car row 5
    new Obstacle(sprites, 105, 300, 50, 21, startpoint1[4], 330, 50, 21, 'from right to left', 'fast', breakpoint[4]),
    new Obstacle(sprites, 105, 300, 50, 21, startpoint2[4], 330, 50, 21, 'from right to left', 'fast', breakpoint[4]),
    new Obstacle(sprites, 105, 300, 50, 21, startpoint3[4], 330, 50, 21, 'from right to left', 'fast', breakpoint[4]),
    // water obstacles
    // water row 1
    new Obstacle(sprites, 14, 405, 33, 25, startpoint1[5], 250, 33, 25, 'from right to left', 'slow', breakpoint[5]),
    new Obstacle(sprites, 14, 405, 33, 25, startpoint2[5], 250, 33, 25, 'from right to left', 'slow', breakpoint[5]),
    new Obstacle(sprites, 14, 405, 33, 25, startpoint3[5], 250, 33, 25, 'from right to left', 'slow', breakpoint[5]),
    // water row 2
    new Obstacle(sprites, 6, 228, 87, 24, logstartpoint[0], 210, 87, 24, 'from left to right', 'slow', logbreakpoint[0]),
    new Obstacle(sprites, 6, 228, 87, 24, logstartpoint[1], 210, 87, 24, 'from left to right', 'slow', logbreakpoint[0]),
    new Obstacle(sprites, 6, 228, 87, 24, logstartpoint[2], 210, 87, 24, 'from left to right', 'slow', logbreakpoint[0]),
    // water row 3
    new Obstacle(sprites, 6, 164, 181, 24, logstartpoint[3], 170, 181, 24, 'from left to right', 'fast', logbreakpoint[1]),
    new Obstacle(sprites, 6, 164, 181, 24, logstartpoint[4], 170, 181, 24, 'from left to right', 'fast', logbreakpoint[1]),
    new Obstacle(sprites, 6, 164, 181, 24, logstartpoint[5], 170, 181, 24, 'from left to right', 'fast', logbreakpoint[1]),
    // water row 4
    new Obstacle(sprites, 14, 405, 33, 25, startpoint1[6], 130, 33, 25, 'from right to left', 'fast', breakpoint[6]),
    new Obstacle(sprites, 14, 405, 33, 25, startpoint2[6], 130, 33, 25, 'from right to left', 'fast', breakpoint[6]),
    new Obstacle(sprites, 14, 405, 33, 25, startpoint3[6], 130, 33, 25, 'from right to left', 'fast', breakpoint[6]),
    // water row 5
    new Obstacle(sprites, 6, 196, 120, 24, logstartpoint[6], 90, 120, 24, 'from left to right', 'medium', logbreakpoint[2]),
    new Obstacle(sprites, 6, 196, 120, 24, logstartpoint[7], 90, 120, 24, 'from left to right', 'medium', logbreakpoint[2]),
    new Obstacle(sprites, 6, 196, 120, 24, logstartpoint[8], 90, 120, 24, 'from left to right', 'medium', logbreakpoint[2])
];

window.addEventListener('keydown',
    function(event) {
        if (lives > 0) {
        var keypress = event.keyCode;
        move(keypress);
        }
    })

function Obstacle(source, sourcex, sourcey, sourcewidth, sourceheight, destx, desty, destwidth, destheight, direction, speed, reset) {
    this.s = source;
    this.sx = sourcex;
    this.sy = sourcey;
    this.sw = sourcewidth;
    this.sh = sourceheight;
    this.dx = destx;
    this.dy = desty;
    this.dw = destwidth;
    this.dh = destheight;
    this.direction= direction;
    this.speed= speed;
    this.resetAtXvalue= reset;
    // draws the obstacle
    this.draw= function(){
        ctx.drawImage(this.s, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
    }
    // updates the obstacle to show movement
    this.update= function(){
        if(this.direction == 'from left to right'){
            if(this.speed == 'slow'){
                this.dx += .5;
                if (this.dx > this.resetAtXvalue && this.resetAtXvalue === logbreakpoint[0]){
                    this.dx = -174;
                }
                if(this.dx > this.resetAtXvalue && this.resetAtXvalue != logbreakpoint[0]){
                    this.dx = -30;
                }
            }
            if(this.speed == 'medium'){
                this.dx += 1;
                if (this.dx > this.resetAtXvalue && this.resetAtXvalue === logbreakpoint[2]){
                    this.dx = -240;
                }
                if(this.dx > this.resetAtXvalue && this.resetAtXvalue != logbreakpoint[2]){
                    this.dx = -30;
                }
            }
            if(this.speed == 'fast'){
                this.dx += 1.25;
                if (this.dx > this.resetAtXvalue && this.resetAtXvalue === logbreakpoint[1]){
                    this.dx = -362;
                }
                if(this.dx > this.resetAtXvalue && this.resetAtXvalue != logbreakpoint[1]){
                    this.dx = -30;
                }
            }
        }
        if(this.direction == 'from right to left'){
            if(this.speed == 'slow'){
                this.dx -= .5;
                if(this.dx < this.resetAtXvalue){
                    this.dx = 470;
                }
            }
            if(this.speed == 'medium'){
                this.dx -= 1;
                if(this.dx < this.resetAtXvalue){
                    this.dx = 470;
                }
            }
            if(this.speed == 'fast'){
                this.dx -= 1.25;
                if(this.dx < this.resetAtXvalue){
                    this.dx = 490;
                }
            }
        }
        this.draw();
    }
}

// TODO
    // onREadyState function
        // Load background and frog in starting position
        // Object movement function
        // Collision function
        // Reset function
        // Play function
            // Allows frog movement from user input
            // Refreshes score
            // Run collision function
setInterval(gameTime, gameSpeed);

function gameTime() {
    if (facing != 'dead') {
        animate();
    }
    else {
        reset();
    }
}

function animate() {
    // Game loop, runs every frame,

    // clears the canvas every before rendering new frame.
    ctx.clearRect(0, 0, game.width, game.height);

    // calls these functions every frame
    drawBackground();
    // draws the obstacles
    for(var i =0; i < obstacleArray.length; i++){
        obstacleArray[i].update();
    }
    // checks game logic
    gameLogic();
    drawFrog();
    carCollision();
    waterCollision();
    logRide();
    gameLogic();
    winner();
}

// Render background
function drawBackground() {
    // water
    ctx.fillStyle = '#4d94ff';
    ctx.fillRect(0, rowHeight, game.width, rowHeight*6);
    // road
    ctx.fillStyle = '#404040';
    ctx.fillRect(0, rowHeight*7, game.width, rowHeight*6);
    // safe zone bottom
    ctx.drawImage(sprites, 0, 120, 399, 35, 0, rowHeight*13, game.width, rowHeight);
    // safe zone middle
    ctx.drawImage(sprites, 0, 120, 399, 35, 0, rowHeight*7, game.width, rowHeight);
    // grass
    ctx.drawImage(sprites, 0, 54, 399, 56, 0, rowHeight, game.width, rowHeight);



    //if first homeSpaceArray flag is triggered, first home space is occupied
    if (homeSpaceArray[0] > 0){
      ctx.drawImage(sprites, 74, 365, 30, 22, 15, 50, frogWidth, frogHeight);
    };
    //if second homeSpaceArray flag is triggered, second home space is occupied
    if (homeSpaceArray[1] > 0){
      ctx.drawImage(sprites, 74, 365, 30, 22, 105, 50, frogWidth, frogHeight);
    };
    //if third homeSpaceArray flag is triggered, third home space is occupied
    if (homeSpaceArray[2] > 0){
      ctx.drawImage(sprites, 74, 365, 30, 22, 200, 50, frogWidth, frogHeight);
    };
    //if fourth homeSpaceArray flag is triggered, fourth home space is occupied
    if (homeSpaceArray[3] > 0){
      ctx.drawImage(sprites, 74, 365, 30, 22, 295, 50, frogWidth, frogHeight);
    };
    //if fifth homeSpaceArray flag is triggered, fifth home space is occupied
    if (homeSpaceArray[4] > 0){
      ctx.drawImage(sprites, 74, 365, 30, 22, 388, 50, frogWidth, frogHeight);
    };


    // top black stripe
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, game.width, rowHeight*1.1);
    // bottom black stripe
    ctx.fillRect(0, rowHeight*13.9, game.width, rowHeight*1.1);
    //  Score and high score text
    ctx.font = 'bold 24px VT323';
    ctx.fillStyle = "white";
    ctx.fillText('SCORE', 10, 18);
    ctx.fillText('HIGH SCORE', 300, 18);
}

function drawFrog() {
    // If alive draws the frog with it's new position values
    if ( facing == 'left' ) {
        ctx.drawImage(sprites, 80, 335, 30, 22, frogX, frogY, frogWidth, frogHeight);
    }

    else if ( facing == 'up' ) {
        ctx.drawImage(sprites, 10, 365, 30, 22, frogX, frogY, frogWidth, frogHeight);
    }

    else if ( facing == 'right' ) {
        ctx.drawImage(sprites, 12, 335, 30, 22, frogX, frogY, frogWidth, frogHeight);
    }

    else if ( facing == 'down' ) {
        ctx.drawImage(sprites, 74, 365, 30, 22, frogX, frogY, frogWidth, frogHeight);
    }

    // If collion occurs draw deathSprite in that position
    else if ( facing == 'dead' ) {
        ctx.drawImage(deathSprite, frogX, frogY, frogWidth, frogHeight);
    }
}

// Frog movement
function move(keypress) {

    if (keypress == 37 && isMoveOnScreen(frogX-rowHeight, frogY)) {
        frogX -= rowHeight;
        facing = 'left';
    }
    else if (keypress == 38 && isMoveOnScreen(frogX, frogY-rowHeight)) {
        frogY -= rowHeight;
        facing = 'up';
        currentScore += 10;
    }
    else if (keypress == 39 && isMoveOnScreen(frogX+rowHeight, frogY)) {
        frogX += rowHeight;
        facing = 'right';
    }
    else if (keypress == 40 && isMoveOnScreen(frogX, frogY+rowHeight)) {
        frogY += rowHeight;
        facing = 'down';
        currentScore -= 10;
    }
}

// Check if proposed move is valid (on screen)
function isMoveOnScreen(x,y) {
    if (x >= 0 && x < game.width-frogWidth && y > rowHeight && y < game.height-rowHeight) {
        return true;
    }
    else {
        console.log('false', x, y);
        return false;
    }
}


// GAME LOGIC
function gameLogic() {
    // If statement to prevent score from decrementing, currentScore
    // is never shown.
    if (currentScore > score) {
        score = currentScore;
    }

    if (score > highScore) {
        localStorage['highScore'] = score;
        highScore = score;
    }

    ctx.fillText('' + score + '', 10, 38);
    ctx.fillText('' + highScore + '', 300, 38);

    for (var i = 0; i < lives; i++) {
        ctx.drawImage(sprites, 10, 365, 30, 22, 5+(30*i), 565, 30, 22)
    }
}

function carCollision() {

     // For loop to check every obstacleX
    for (var i = 0; i < 15; i++) {
        var obs = obstacleArray[i];
        if (frogY == obs.dy && ((frogX < obs.dx + obs.dw/2) && (frogX > obs.dx - obs.dw/2))) {

           // Decrement lives
           lives--;

           facing = 'dead';
           ctx.drawImage(deathSprite, frogX, frogY, frogWidth, frogHeight);
        }
    }
}

function waterCollision() {
    for (var i = 15; i < 30; i = i+3) {
        var obs = obstacleArray[i];
        var count = 0;

        // With three objects on every row we have to check for collisions with
        // all three to see if frog is in the water
        for (var j = 0; j < 3; j++) {
            obs = obstacleArray[i+j];
            if (i >= 15 && frogY == obs.dy && ((frogX > obs.dx + obs.dw) || (frogX < obs.dx - obs.dw/2))) {
                count++;
            }
            // If frog is not on any of the three objects in a row then frog
            // is dead
        if (count == 3) {

          facing = 'dead';
          lives--;
          ctx.drawImage(deathSprite, frogX, frogY, frogWidth, frogHeight);

            }
        }
    }
}

function logRide() {

    // For loop to check every obstacleX
    for (var i = 15; i < 30; i++) {
        var obs = obstacleArray[i];

        // If frog is on an object in the water
        if (frogY == obs.dy && ((frogX < obs.dx + obs.dw) && (frogX > obs.dx))) {

            // Increment frog position according to object speed
            if(obs.direction == 'from left to right'){
                if(obs.speed == 'slow'){
                    frogX += .5;
                }
                if(obs.speed == 'medium'){
                    frogX += 1;
                }
                if(obs.speed == 'fast'){
                    frogX += 1.25;
                }
            }
            if(obs.direction == 'from right to left'){
                if(obs.speed == 'slow'){
                    frogX -= .5;
                }
                if(obs.speed == 'medium'){
                    frogX -= 1;
                }
                if(obs.speed == 'fast'){
                    frogX -= 1.25;
                }
            }
        }
    }
}


function reset() {
    frogX = 200;
    frogY = 530;
    //checks if all home spaces are occupied
    if (homeSpaceArray.indexOf(0) == -1){
      console.log('Victory!')
      //clears all home spaces
      homeSpaceArray = [0,0,0,0,0];
      //awards extra life
      lives++;
      }
    if (!winner()) {
        score = 0;
        currentScore = 0;
    }
    if (lives == 0) {
        // Display losing message
        ctx.drawImage(gameOverSprite, 85, 170, 280, 280);
        newGameBtn.style.display = 'inline-block';
    }
}


function newGame(){
  console.log('starting new game');
   score = 0;
   currentScore = 0;
   highScore = 0;
  if (window.localStorage['highScore']) {
      highScore = localStorage['highScore'];
  }
  lives = 3;
  frogWidth = 30;
  frogHeight = 22;
  frogX = 200;
  frogY = 530;
  facing = 'up';
  gameSpeed = 10;
  logbreakpoint = [527, 621, 560];
  logstartpoint = [-87, -320, -553, -181, -508, -835, -120, -386, -652];
  breakpoint = [-27, 470, -30, 470, -50, -33, -33];
  startpoint1 = [440, -30, 440, -30, 440, 440, 440];
  startpoint2 = [613, -206, 616, -206, 636, 473, 473];
  startpoint3 = [759, -382, 792, -382, 832, 506, 506];
  desty = [490, 450, 410, 370, 330, 250, 210, 170, 130, 120];
  destwidth = [27, 30, 30, 30, 50, 33, 87, 181, 33, 120];
  destheight = [28, 23, 23, 27, 21, 25, 24, 24, 25, 24];
  homeSpaceArray = [0,0,0,0,0];
  newGameBtn.style.display = 'none';
  obstacleArray = [
      // road obstacles
      // car row 1
      new Obstacle(sprites, 80, 262, 27, 28, startpoint1[0], 490, 27, 28, 'from right to left', 'slow', breakpoint[0]),
      new Obstacle(sprites, 80, 262, 27, 28, startpoint2[0], 490, 27, 28, 'from right to left', 'slow', breakpoint[0]),
      new Obstacle(sprites, 80, 262, 27, 28, startpoint3[0], 490, 27, 28, 'from right to left', 'slow', breakpoint[0]),
      // car row 2
      new Obstacle(sprites, 70, 300, 30, 23, startpoint1[1], 450, 30, 23, 'from left to right', 'slow', breakpoint[1]),
      new Obstacle(sprites, 70, 300, 30, 23, startpoint2[1], 450, 30, 23, 'from left to right', 'slow', breakpoint[1]),
      new Obstacle(sprites, 70, 300, 30, 23, startpoint3[1], 450, 30, 23, 'from left to right', 'slow', breakpoint[1]),
      // car row 3
      new Obstacle(sprites, 10, 265, 30, 23, startpoint1[2], 410, 30, 23, 'from right to left', 'medium', breakpoint[2]),
      new Obstacle(sprites, 10, 265, 30, 23, startpoint2[2], 410, 30, 23, 'from right to left', 'medium', breakpoint[2]),
      new Obstacle(sprites, 10, 265, 30, 23, startpoint3[2], 410, 30, 23, 'from right to left', 'medium', breakpoint[2]),
      // car row 4
      new Obstacle(sprites, 45, 263, 30, 27, startpoint1[3], 370, 30, 27, 'from left to right', 'medium', breakpoint[3]),
      new Obstacle(sprites, 45, 263, 30, 27, startpoint2[3], 370, 30, 27, 'from left to right', 'medium', breakpoint[3]),
      new Obstacle(sprites, 45, 263, 30, 27, startpoint3[3], 370, 30, 27, 'from left to right', 'medium', breakpoint[3]),
      // car row 5
      new Obstacle(sprites, 105, 300, 50, 21, startpoint1[4], 330, 50, 21, 'from right to left', 'fast', breakpoint[4]),
      new Obstacle(sprites, 105, 300, 50, 21, startpoint2[4], 330, 50, 21, 'from right to left', 'fast', breakpoint[4]),
      new Obstacle(sprites, 105, 300, 50, 21, startpoint3[4], 330, 50, 21, 'from right to left', 'fast', breakpoint[4]),
      // water obstacles
      // water row 1
      new Obstacle(sprites, 14, 405, 33, 25, startpoint1[5], 250, 33, 25, 'from right to left', 'slow', breakpoint[5]),
      new Obstacle(sprites, 14, 405, 33, 25, startpoint2[5], 250, 33, 25, 'from right to left', 'slow', breakpoint[5]),
      new Obstacle(sprites, 14, 405, 33, 25, startpoint3[5], 250, 33, 25, 'from right to left', 'slow', breakpoint[5]),
      // water row 2
      new Obstacle(sprites, 6, 228, 87, 24, logstartpoint[0], 210, 87, 24, 'from left to right', 'slow', logbreakpoint[0]),
      new Obstacle(sprites, 6, 228, 87, 24, logstartpoint[1], 210, 87, 24, 'from left to right', 'slow', logbreakpoint[0]),
      new Obstacle(sprites, 6, 228, 87, 24, logstartpoint[2], 210, 87, 24, 'from left to right', 'slow', logbreakpoint[0]),
      // water row 3
      new Obstacle(sprites, 6, 164, 181, 24, logstartpoint[3], 170, 181, 24, 'from left to right', 'fast', logbreakpoint[1]),
      new Obstacle(sprites, 6, 164, 181, 24, logstartpoint[4], 170, 181, 24, 'from left to right', 'fast', logbreakpoint[1]),
      new Obstacle(sprites, 6, 164, 181, 24, logstartpoint[5], 170, 181, 24, 'from left to right', 'fast', logbreakpoint[1]),
      // water row 4
      new Obstacle(sprites, 14, 405, 33, 25, startpoint1[6], 130, 33, 25, 'from right to left', 'fast', breakpoint[6]),
      new Obstacle(sprites, 14, 405, 33, 25, startpoint2[6], 130, 33, 25, 'from right to left', 'fast', breakpoint[6]),
      new Obstacle(sprites, 14, 405, 33, 25, startpoint3[6], 130, 33, 25, 'from right to left', 'fast', breakpoint[6]),
      // water row 5
      new Obstacle(sprites, 6, 196, 120, 24, logstartpoint[6], 90, 120, 24, 'from left to right', 'medium', logbreakpoint[2]),
      new Obstacle(sprites, 6, 196, 120, 24, logstartpoint[7], 90, 120, 24, 'from left to right', 'medium', logbreakpoint[2]),
      new Obstacle(sprites, 6, 196, 120, 24, logstartpoint[8], 90, 120, 24, 'from left to right', 'medium', logbreakpoint[2])
  ];
}

function winner() {

      //if frog jumps in first homespace and it is empty
      if (((frogY == 50) && (frogX > 5 && frogX < 25)) && homeSpaceArray[0] == 0) {
          currentScore = score + 300;
          //triggers first homespace flag
          homeSpaceArray[0]++;
          console.log(frogX);
          reset();
      } else
      //if frog jumps in second homespace and it is empty
      if (((frogY == 50) && (frogX > 95 && frogX < 115)) && homeSpaceArray[1] == 0) {
          currentScore = score + 300;
          //triggers second homespace flag
          homeSpaceArray[1]++;
          console.log(frogX);
          reset();
      } else
      //if frog jumps in third homespace and it is empty
      if (((frogY == 50) && (frogX > 190 && frogX < 215)) && homeSpaceArray[2] == 0) {
          currentScore = score + 300;
          //triggers third homespace flag
          homeSpaceArray[2]++;
          console.log(frogX);
          reset();
      } else
      //if frog jumps in fourth homespace and it is empty
      if (((frogY == 50) && (frogX > 285 && frogX < 305)) && homeSpaceArray[3] == 0) {
          currentScore = score + 300;
          //triggers fourth homespace flag
          homeSpaceArray[3]++;
          console.log(frogX);
          reset();
      } else
      //if frog jumps in fifth homespace and it is empty
      if (((frogY == 50) && (frogX > 378 && frogX < 398)) && homeSpaceArray[4] == 0) {
          currentScore = score + 300;
          //triggers fifth homespace flag
          homeSpaceArray[4]++;
          console.log(frogX);
          reset();
      } else
      //if frog doesn't jump in empty homespace
      if (frogY == 50){
        ctx.drawImage(deathSprite, frogX, frogY, 30, 22);
        lives--;
        frogX = 200;
        frogY = 530;
        facing = 'dead';
        if (lives == 0) {
            // Display losing message
            ctx.drawImage(gameOverSprite, 85, 170, 280, 280);
            newGameBtn.style.display = 'inline-block';
      }
    }

    return true;
}
