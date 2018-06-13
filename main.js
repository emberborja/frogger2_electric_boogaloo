// Initialize canvas element
var game = document.getElementById('game');
var ctx = game.getContext('2d');

// Include sprites
var sprites = new Image();
sprites.src = 'assets/frogger-sprites.png';

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

// TODO: What is this doing?
function animate() {
    // infinite loop
    requestAnimationFrame(animate);
    // clears the canvas everytime infinite loop runs
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // calls these functions everytime the infinite loop runs
    drawBackground();
    // draws the frog with it's new position values
    ctx.drawImage(sprites, 10, 365, 30, 22, posX, posY, 30, 22);
    // draws the obstacles
    obstacles();
    // checks game logic
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

// FROG ANIMATIONS

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
        ctx.drawImage(sprites, 12, 369, 23, 17, posX, posY, 23, 17);
        console.log(posX);
    }
    if (keypress == 38 && isMoveValid(posX, posY-40)) {
        posY -= 40;
        ctx.drawImage(sprites, 12, 369, 23, 17, posX, posY, 23, 17);
        currentScore += 10;
    }
    if (keypress == 39 && isMoveValid(posX+32, posY)) {
        posX += 32;
        ctx.drawImage(sprites, 12, 369, 23, 17, posX, posY, 23, 17);
    }
    if (keypress == 40 && isMoveValid(posX, posY+40)) {
        posY += 40;
        ctx.drawImage(sprites, 12, 369, 23, 17, posX, posY, 23, 17);
        currentScore -= 10;
    }
}


// Check if proposed move is valid (on screen)
function isMoveValid(x,y) {
    if (x > 2 && x < 420 && y > 45 && y < 560 ) {
        return true;
    }
    else{
        return false;
    }
}



// OBSTACLE ANIMATIONS
function obstacles() {
    ctx.drawImage(sprites, 80, 262, 27, 28, 200, 480, 27, 28);
}


// GAME LOGIC
function gameLogic() {
    // If statement to only display highest currentScore
    if (score < currentScore) {
        score = currentScore;
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


function isDead() {

}

animate();
