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
var posX = 220;
var posY = 540;

// obstacle variables
    // first row: car
    var firstRowCarPositionX = 450;
    var firstRowCarVelocity = 1;


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
    console.log(keypress);
    if (keypress == 37) {
        posX -= 40;
        ctx.drawImage(sprites, 12, 369, 23, 17, posX, posY, 23, 17);
        console.log(posX);
    }
    if (keypress == 38) {
        posY -= 40;
        ctx.drawImage(sprites, 12, 369, 23, 17, posX, posY, 23, 17);
    }
    if (keypress == 39) {
        posX += 40;
        ctx.drawImage(sprites, 12, 369, 23, 17, posX, posY, 23, 17);
    }
    if (keypress == 40) {
        posY += 40;
        ctx.drawImage(sprites, 12, 369, 23, 17, posX, posY, 23, 17);
    }
}

// OBSTACLE ANIMATIONS
function obstacles() {
    // draws the car obstacle for the first row
    ctx.drawImage(sprites, 80, 262, 27, 28, this.firstRowCarPositionX, 480, 27, 28);
    this.firstRowCarPositionX -= this.firstRowCarVelocity;
    if(this.firstRowCarPositionX < -35){
        this.firstRowCarPositionX = 450;
    }
}


// GAME LOGIC   
function gameLogic() {
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

animate();

