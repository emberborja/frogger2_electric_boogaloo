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






// Adds event listener to trigger everytime there is a keypress. It then passes that keypress into the 'move' function.
window.addEventListener('keydown',
    function(event) {
        var keypress = event.keyCode;
        move(keypress);
    })

// Render background
function drawBackground() {

    ctx.fillStyle = '#4d94ff';
    ctx.fillRect(0, 40, 440, 240);

    ctx.fillStyle = '#404040';
    ctx.fillRect(0, 320, 440, 200);

    ctx.drawImage(sprites, 0, 120, 399, 35, 0, 520, 440, 44);
    ctx.drawImage(sprites, 0, 120, 399, 35, 0, 280, 440, 44);
    ctx.drawImage(sprites, 0, 54, 399, 56, 0, 38, 440, 44);


    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 440, 40);
    ctx.fillRect(0, 560, 440, 40);

    ctx.font = 'bold 24px VT323';
    ctx.fillStyle = "white";
    ctx.fillText('SCORE', 10, 18);

    ctx.fillText('HIGH SCORE', 300, 18);

    // TODO: Take out of drawBackground and move to game logic or whatever function runs continuously
    ctx.fillText('' + score + '', 10, 35);
    ctx.fillText('' + highScore + '', 300, 35);
}

// TODO: What is this doing?
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    drawBackground();
    play();
}

// Initialize the game
function play() {
    ctx.drawImage(sprites, 10, 365, 30, 22, posX, posY, 30, 22);

    ctx.fillText('' + score + '', 10, 38);
    ctx.fillText('' + highScore + '', 250, 38);

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

    ctx.drawImage(sprites, 80, 262, 27, 28, 220, 480, 27, 28);
}

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
    }
    if (keypress == 39 && isMoveValid(posX+32, posY)) {
        posX += 32;
        ctx.drawImage(sprites, 12, 369, 23, 17, posX, posY, 23, 17);
    }
    if (keypress == 40 && isMoveValid(posX, posY+40)) {
        posY += 40;
        ctx.drawImage(sprites, 12, 369, 23, 17, posX, posY, 23, 17);

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


animate();
