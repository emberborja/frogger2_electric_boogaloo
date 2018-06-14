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

// obstacle variables



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
// setInterval(animate,10);
function animate() {
    // // infinite loop
    requestAnimationFrame(animate);
    //
    //
    // // clears the canvas everytime infinite loop runs
    // ctx.clearRect(0, 0, innerWidth, innerHeight);
    // // calls these functions everytime the infinite loop runs
    drawBackground();
    drawFrog();
    //
    // // draws the obstacles
    for(var i =0; i < obstacleArray.length; i++){
        obstacleArray[i].update();
    }
    // // checks game logic
    // gameLogic();
    collision();
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

var breakpoint = [-27, 470, -30, 470, -50, -33, 527, 621, -33, 560];
var startpoint1 = [440, -30, 440, -30, 440, 440, -87, -181, 440, -120];
var startpoint2 = [521, -176, 521, -176, 521, 521, -233, -327, 521, -266];
var startpoint3 = [629, -322, 629, -322, 629, 629, -379, -473, 629, -412];

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
    new Obstacle(sprites, 6, 228, 87, 24, startpoint1[6], 210, 87, 24, 'from left to right', 'slow', breakpoint[6]),
    new Obstacle(sprites, 6, 228, 87, 24, startpoint2[6], 210, 87, 24, 'from left to right', 'slow', breakpoint[6]),
    new Obstacle(sprites, 6, 228, 87, 24, startpoint3[6], 210, 87, 24, 'from left to right', 'slow', breakpoint[6]),
    // water row 3
    new Obstacle(sprites, 6, 164, 181, 24, startpoint1[7], 170, 181, 24, 'from left to right', 'fast', breakpoint[7]),
    new Obstacle(sprites, 6, 164, 181, 24, startpoint2[7], 170, 181, 24, 'from left to right', 'fast', breakpoint[7]),
    new Obstacle(sprites, 6, 164, 181, 24, startpoint3[7], 170, 181, 24, 'from left to right', 'fast', breakpoint[7]),
    // water row 4
    new Obstacle(sprites, 14, 405, 33, 25, startpoint1[8], 130, 33, 25, 'from right to left', 'fast', breakpoint[8]),
    new Obstacle(sprites, 14, 405, 33, 25, startpoint2[8], 130, 33, 25, 'from right to left', 'fast', breakpoint[8]),
    new Obstacle(sprites, 14, 405, 33, 25, startpoint3[8], 130, 33, 25, 'from right to left', 'fast', breakpoint[8]),
    // water row 5
    new Obstacle(sprites, 6, 196, 120, 24, startpoint1[9], 90, 120, 24, 'from left to right', 'medium', breakpoint[9]),
    new Obstacle(sprites, 6, 196, 120, 24, startpoint2[9], 90, 120, 24, 'from left to right', 'medium', breakpoint[9]),
    new Obstacle(sprites, 6, 196, 120, 24, startpoint3[9], 90, 120, 24, 'from left to right', 'medium', breakpoint[9])
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
                if(this.dx > this.resetAtXvalue){
                    this.dx = destx;
                }
            }
            if(this.speed == 'medium'){
                this.dx += 1;
                if(this.dx > this.resetAtXvalue){
                    this.dx = destx;
                }
            }
            if(this.speed == 'fast'){
                this.dx += 1.5;
                if(this.dx > this.resetAtXvalue){
                    this.dx = destx;
                }
            }
        }
        if(this.direction == 'from right to left'){
            if(this.speed == 'slow'){
                this.dx -= .5;
                if(this.dx < this.resetAtXvalue){
                    this.dx = 440;
                }
            }
            if(this.speed == 'medium'){
                this.dx -= 1;
                if(this.dx < this.resetAtXvalue){
                    this.dx = destx;
                }
            }
            if(this.speed == 'fast'){
                this.dx -= 1.5;
                if(this.dx < this.resetAtXvalue){
                    this.dx = destx;
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

function collision() {
    // Flag

     // For loop to check every obstacleX
        for (var i = 0; i < obstacleArray.length; i++) {
            var obs = obstacleArray[i];
            if (i < 15 && posY == obs.dy && ((posX < obs.dx + obs.dw) && (posX > obs.dx - obs.dw))) {

               // Decrement lives
               lives--;

               facing = 'dead';
            }
            else if (i >= 15 && posY == obs.dy && ((posX > obs.dx + obs.dw) && (posX < obs.dx - obs.dw))){
                facing = 'dead';
            }
        }
}

function reset() {
    // Move frog to start
    posX = 200;
    posy = 530;

    // Reset score
    // score = 0;
    // currentScore = 0;
    isAlive = true;
}

// function didFinish() {
//     if (posY == (50)) {
//         ctx.drawImage(sprites, 10, 365, 30, 22, posX, 50, 30, 22);
//     }
// }
animate();
