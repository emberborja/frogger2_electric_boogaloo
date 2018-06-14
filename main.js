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


var obstacleArray = [
    new Obstacle(sprites, 80, 262, 27, 28, 450, 490, 27, 28, 'left', 'slow'),
    new Obstacle(sprites, 70, 300, 30, 23, -50, 450, 30, 23, 'right', 'slow'),
    new Obstacle(sprites, 10, 265, 30, 23, 450, 410, 30, 23, 'left', 'medium'),
    new Obstacle(sprites, 45, 263, 30, 27, -50, 370, 30, 27, 'right', 'medium'),
    new Obstacle(sprites, 105, 300, 50, 21, 480, 330, 50, 21, 'left', 'fast'),
    new Obstacle(sprites, 14, 405, 33, 25, 450, 250, 33, 25, 'left', 'slow'),
    new Obstacle(sprites, 6, 228, 87, 24, -100, 210, 87, 24, 'right', 'slow'),
    new Obstacle(sprites, 6, 164, 181, 24, -300, 170, 181, 24, 'right', 'fast'),
    new Obstacle(sprites, 14, 405, 33, 25, 450, 130, 33, 25, 'left', 'fast'),
    new Obstacle(sprites, 6, 196, 120, 24, -160, 90, 120, 24, 'right', 'medium')
];

function Obstacle(source, sourcex, sourcey, sourcewidth, sourceheight, destx, desty, destwidth, destheight, direction, speed) {
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
    // draws the obstacle
    this.draw= function(){
        ctx.drawImage(this.s, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
    }
    // updates the obstacle to show movement
    this.update= function(){
        if(this.direction == 'right'){
            if(this.speed == 'slow'){
                this.dx += .5;
                if(this.dx > (450 + this.sw)){
                    this.dx = destx;
                }
            }
            if(this.speed == 'medium'){
                this.dx += 1;
                if(this.dx > (450 + this.sw)){
                    this.dx = destx;
                }
            }
            if(this.speed == 'fast'){
                this.dx += 1.5;
                if(this.dx > (450 + this.sw)){
                    this.dx = destx;
                }
            }
        }
        if(this.direction == 'left'){
            if(this.speed == 'slow'){
                this.dx -= .5;
                if(this.dx < (-50 - this.sw)){
                    this.dx = destx;
                }
            }
            if(this.speed == 'medium'){
                this.dx -= 1;
                if(this.dx < (-50 - this.sw)){
                    this.dx = destx;
                }
            }
            if(this.speed == 'fast'){
                this.dx -= 1.5;
                if(this.dx < (-50 - this.sw)){
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
