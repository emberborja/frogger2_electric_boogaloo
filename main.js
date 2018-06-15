// Initialize canvas element
var game = document.getElementById('game');
var ctx = game.getContext('2d');

// Include sprites
var sprites = new Image();
sprites.src = 'assets/frogger-sprites.png';
var deathSprite = new Image();
deathSprite.src = 'assets/skull-sprite.png'

// Set score variables
var score = 0;
var highScore = 0;
var lives = 3;
    // Variable to hold current high score to display as 'score'. This way the
    // player cannot score by going backward and forward over and over in the
    // same place.
var currentScore = 0;

// Frog position
var posX = 200;
var posY = 530;
var facing = '';

// Time variable
var sec = 10;

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
setInterval(gameTime, sec);

function gameTime() {
    if (facing != 'dead') {
        animate();
    }
    else {
        reset();
    }
}

function animate() {
    // infinite loop
    // requestAnimationFrame(animate);
    // clears the canvas everytime infinite loop runs
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // calls these functions everytime the infinite loop runs
    drawBackground();
    // draws the obstacles
    for(var i =0; i < obstacleArray.length; i++){
        obstacleArray[i].update();
    }
    // checks game logic
    gameLogic();
    drawFrog();
    car_collision();
    water_collision();
    logRide();
    gameLogic();
}

// Render background
function drawBackground() {
    // water
    ctx.fillStyle = '#4d94ff';
    ctx.fillRect(0, 40, 440, 240);
    // road
    ctx.fillStyle = '#404040';
    ctx.fillRect(0, 320, 440, 200);
    // safe zone bottom
    ctx.drawImage(sprites, 0, 120, 399, 35, 0, 520, 440, 44);
    // safe zone middle
    ctx.drawImage(sprites, 0, 120, 399, 35, 0, 280, 440, 44);
    // grass
    ctx.drawImage(sprites, 0, 54, 399, 56, 0, 38, 440, 44);
    // top black stripe
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 440, 40);
    // bottom black stripe
    ctx.fillRect(0, 560, 440, 40);
    //  Score and high score text
    ctx.font = 'bold 24px VT323';
    ctx.fillStyle = "white";
    ctx.fillText('SCORE', 10, 18);
    ctx.fillText('HIGH SCORE', 300, 18);
}

function drawFrog() {
    // If alive draws the frog with it's new position values
    if ( facing == 'left' ) {
        ctx.drawImage(sprites, 80, 335, 30, 22, posX, posY, 30, 22);
    }

    else if ( facing == 'up' ) {
        ctx.drawImage(sprites, 10, 365, 30, 22, posX, posY, 30, 22);
    }

    else if ( facing == 'right' ) {
        ctx.drawImage(sprites, 12, 335, 30, 22, posX, posY, 30, 22);
    }

    else if ( facing == 'down' ) {
        ctx.drawImage(sprites, 74, 365, 30, 22, posX, posY, 30, 22);
    }

    // If collion occurs draw deathSprite in that position
    else if ( facing == 'dead' ) {
        ctx.drawImage(deathSprite, posX, posY, 30, 22);
        animate.stop
    }
}


// Adds event listener to trigger everytime there is a keypress. It then passes that keypress into the 'move' function.
window.addEventListener('keydown',
    function(event) {
        var keypress = event.keyCode;
        move(keypress);
    })

// Frog movement
function move(keypress) {

    if (keypress == 37 && isMoveValid(posX-32, posY)) {
        posX -= 32;
        facing = 'left';
        ctx.drawImage(sprites, 80, 335, 23, 17, posX, posY, 19, 23);
    }
    else if (keypress == 38 && isMoveValid(posX, posY-40)) {
        posY -= 40;
        facing = 'up';
        currentScore += 10;
        ctx.drawImage(sprites, 12, 369, 23, 17, posX, posY, 23, 17);

    }
    else if (keypress == 39 && isMoveValid(posX+32, posY)) {
        posX += 32;
        facing = 'right';
        ctx.drawImage(sprites, 12, 335, 23, 17, posX, posY, 19, 23);
    }
    else if (keypress == 40 && isMoveValid(posX, posY+40)) {
        posY += 40;
        facing = 'down';
        currentScore -= 10;
        ctx.drawImage(sprites, 12, 369, 23, 17, posX, posY, 23, 17);
    }

}

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

// Check if proposed move is valid (on screen)
function isMoveValid(x,y) {
    if (x > 2 && x < 420 && y > 45 && y < 560 ) {
        return true;
    }
    else{
        return false;
    }
}
var logbreakpoint = [527, 621, 560];
var logstartpoint = [-87, -320, -553, -181, -508, -835, -120, -386, -652];

var breakpoint = [-27, 470, -30, 470, -50, -33, -33];

var startpoint1 = [440, -30, 440, -30, 440, 440, 440];
var startpoint2 = [613, -206, 616, -206, 636, 473, 473];
var startpoint3 = [759, -382, 792, -382, 832, 506, 506];

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

// GAME LOGIC
function gameLogic() {
    // If statement to only display highest currentScore
    if (score < currentScore) {
        score = currentScore;
    }

    if (window.localStorage['highScore']) {
        highScore = localStorage['highScore'];
    } else highScore = 0;
    if (score > highScore) {
        localStorage['highScore'] = score;
        highScore = score;
    }

    ctx.fillText('' + score + '', 10, 38);
    ctx.fillText('' + highScore + '', 300, 38);

    if (lives == 3) {
        ctx.drawImage(sprites, 10, 365, 30, 22, 5, 565, 30, 22);
        ctx.drawImage(sprites, 10, 365, 30, 22, 35, 565, 30, 22);
        ctx.drawImage(sprites, 10, 365, 30, 22, 65, 565, 30, 22);
    } else if (lives == 2) {
        ctx.drawImage(sprites, 10, 365, 30, 22, 5, 565, 30, 22);
        ctx.drawImage(sprites, 10, 365, 30, 22, 35, 565, 30, 22);
    } else if (lives == 1) {
        ctx.drawImage(sprites, 10, 365, 30, 22, 5, 565, 30, 22);
    }
}

function car_collision() {

     // For loop to check every obstacleX
    for (var i = 0; i < 15; i++) {
        var obs = obstacleArray[i];
        if (posY == obs.dy && ((posX < obs.dx + obs.dw/2) && (posX > obs.dx - obs.dw/2))) {

           // Decrement lives
           lives--;

           facing = 'dead';
        }
    }
}

function water_collision() {
    for (var i = 15; i < 30; i = i+3) {
        var obs = obstacleArray[i];
        var count = 0;

        // With three objects on every row we have to check for collisions with
        // all three to see if frog is in the water
        for (var j = 0; j < 3; j++) {
            obs = obstacleArray[i+j];
            if (i >= 15 && posY == obs.dy && ((posX > obs.dx + obs.dw/2) || (posX < obs.dx - obs.dw/2))) {
                count++;
            }
            // If frog is not on any of the three objects in a row then frog
            // is dead
            if (count == 3) {
            facing = 'dead';
            }
        }
    }
}

function logRide() {

    // For loop to check every obstacleX
    for (var i = 15; i < 30; i++) {
        var obs = obstacleArray[i];

        // If frog is on an object in the water
        if (posY == obs.dy && ((posX < obs.dx + obs.dw/2) && (posX > obs.dx - obs.dw/2))) {

            // Increment frog position according to object speed
            if(obs.direction == 'from left to right'){
                if(obs.speed == 'slow'){
                    posX += .5;
                }
                if(obs.speed == 'medium'){
                    posX += 1;
                }
                if(obs.speed == 'fast'){
                    posX += 1.25;
                }
            }
            if(obs.direction == 'from right to left'){
                if(obs.speed == 'slow'){
                    posX -= .5;
                }
                if(obs.speed == 'medium'){
                    posX -= 1;
                }
                if(obs.speed == 'fast'){
                    posX -= 1.25;
                }
            }
        }
    }
}


function reset() {

    posX = 200;
    posY = 530;
}
