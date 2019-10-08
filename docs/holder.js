import {
    game,
    ctx,
    newGameBtn,
    pressSpaceToContinue,
    sprites,
    deathSprite,
    gameOverSprite,
    gameSpeed
} from "./frogger/initialize";

import { score, currentScore, highScore, lives } from "./frogger/score";

import {
    frogWidth,
    frogHeight,
    frogStartX,
    frogStartY,
    frogX,
    frogY,
    status
} from "./frogger/frog";

import { rowHeight } from "./frogger/gameBoard";

import {
    logbreakpoint,
    logstartpoint,
    breakpoint,
    startpoint1,
    startpoint2,
    startpoint3,
    desty,
    homeSpaceArray,
    destwidth,
    destheight,
    obstacleArray
} from "./frogger/obstacles";

class CVS {
    //CVS is short for canvas, not a convenience store/pharmacy
    constructor() { }
}

(function () {
    let cvs = new CVS();
})();



window.addEventListener("keydown", function (event) {
    if (lives > 0) {
        var keypress = event.keyCode;
        move(keypress);
    }
});

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
    if (status != "dead") {
        animate();
    } else {
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
    for (var i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].update();
    }
    // checks game logic
    gameLogic();
    drawFrog();
    carCollision();
    waterCollision();
    logRide();
    winner();
    pressSpaceToContinue.style.display = "none";
}



function drawFrog() {
    // If alive draws the frog with it's new position values
    if (status == "left") {
        ctx.drawImage(
            sprites,
            80,
            335,
            30,
            22,
            frogX,
            frogY,
            frogWidth,
            frogHeight
        );
    } else if (status == "up") {
        ctx.drawImage(
            sprites,
            10,
            365,
            30,
            22,
            frogX,
            frogY,
            frogWidth,
            frogHeight
        );
    } else if (status == "right") {
        ctx.drawImage(
            sprites,
            12,
            335,
            30,
            22,
            frogX,
            frogY,
            frogWidth,
            frogHeight
        );
    } else if (status == "down") {
        ctx.drawImage(
            sprites,
            74,
            365,
            30,
            22,
            frogX,
            frogY,
            frogWidth,
            frogHeight
        );
    }

    // If collion occurs draw deathSprite in that position
    else if (status == "dead") {
        ctx.drawImage(deathSprite, frogX, frogY, frogWidth, frogHeight);
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
        localStorage["highScore"] = score;
        highScore = score;
    }

    ctx.fillText("" + score + "", 10, 38);
    ctx.fillText("" + highScore + "", 300, 38);

    for (var i = 0; i < lives; i++) {
        ctx.drawImage(sprites, 10, 365, 30, 22, 5 + 30 * i, 565, 30, 22);
    }
}

function carCollision() {
    // For loop to check every obstacleX
    for (var i = 0; i < 15; i++) {
        var obs = obstacleArray[i];
        if (
            frogY == obs.dy &&
            (frogX < obs.dx + obs.dw / 2 && frogX > obs.dx - obs.dw / 2)
        ) {
            // Decrement lives
            lives--;
            status = "dead";
            ctx.drawImage(deathSprite, frogX, frogY, frogWidth, frogHeight);
        }
    }
}

function waterCollision() {
    for (var i = 15; i < 30; i = i + 3) {
        var obs = obstacleArray[i];
        var count = 0;

        // With three objects on every row we have to check for collisions with
        // all three to see if frog is in the water
        for (var j = 0; j < 3; j++) {
            obs = obstacleArray[i + j];
            if (
                i >= 15 &&
                frogY == obs.dy &&
                (frogX > obs.dx + obs.dw || frogX < obs.dx - obs.dw / 2)
            ) {
                count++;
            }
            // If frog is not on any of the three objects in a row then frog
            // is dead
            if (count == 3) {
                status = "dead";
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
        if (frogY == obs.dy && (frogX < obs.dx + obs.dw && frogX > obs.dx)) {
            // Increment frog position according to object speed
            if (obs.direction == "from left to right") {
                if (obs.speed == "slow") {
                    frogX += 0.5;
                }
                if (obs.speed == "medium") {
                    frogX += 1;
                }
                if (obs.speed == "fast") {
                    frogX += 1.25;
                }
            }
            if (obs.direction == "from right to left") {
                if (obs.speed == "slow") {
                    frogX -= 0.5;
                }
                if (obs.speed == "medium") {
                    frogX -= 1;
                }
                if (obs.speed == "fast") {
                    frogX -= 1.25;
                }
            }
        }
    }
}

function reset() {
    frogX = frogStartX;
    frogY = frogStartY;

    //checks if all home spaces are occupied
    if (homeSpaceArray.indexOf(0) == -1) {
        console.log("Victory!");
        //clears all home spaces
        homeSpaceArray = [0, 0, 0, 0, 0];
        //awards extra life
        lives++;
        gameSpeed = gameSpeed * 0.9;
    }
    if (!winner()) {
        score = 0;
        currentScore = 0;
    }
    if (lives != 0) {
        pressSpaceToContinue.style.display = "inline-block";
    }
    if (lives == 0) {
        // Display losing message
        ctx.drawImage(
            gameOverSprite,
            85,
            170,
            game.width / 1.57,
            game.height / 2.14
        );
        newGameBtn.style.display = "inline-block";
    }
}

function newGame() {
    console.log("starting new game");
    score = 0;
    currentScore = 0;
    highScore = 0;
    if (window.localStorage["highScore"]) {
        highScore = localStorage["highScore"];
    }
    lives = 3;
    frogX = frogStartX;
    frogY = frogStartY;
    status = "up";
    gameSpeed = 10;

    homeSpaceArray = [0, 0, 0, 0, 0];
    newGameBtn.style.display = "none";
}

function winner() {
    //if frog jumps in first homespace and it is empty
    if (frogY == 50) {
        if (frogX > 5 && frogX < 25 && homeSpaceArray[0] == 0) {
            currentScore = score + 300;
            //triggers first homespace flag
            homeSpaceArray[0]++;
            // console.log(frogX);
            reset();
        }
        //if frog jumps in second homespace and it is empty
        else if (frogX > 95 && frogX < 115 && homeSpaceArray[1] == 0) {
            currentScore = score + 300;
            //triggers second homespace flag
            homeSpaceArray[1]++;
            // console.log(frogX);
            reset();
        }
        //if frog jumps in third homespace and it is empty
        else if (frogX > 190 && frogX < 215 && homeSpaceArray[2] == 0) {
            currentScore = score + 300;
            //triggers third homespace flag
            homeSpaceArray[2]++;
            // console.log(frogX);
            reset();
        }
        //if frog jumps in fourth homespace and it is empty
        else if (frogX > 285 && frogX < 305 && homeSpaceArray[3] == 0) {
            currentScore = score + 300;
            //triggers fourth homespace flag
            homeSpaceArray[3]++;
            // console.log(frogX);
            reset();
        }
        //if frog jumps in fifth homespace and it is empty
        else if (frogX > 378 && frogX < 398 && homeSpaceArray[4] == 0) {
            currentScore = score + 300;
            //triggers fifth homespace flag
            homeSpaceArray[4]++;
            // console.log(frogX);
            reset();
        }
        //if frog doesn't jump in empty homespace
        else {
            ctx.drawImage(deathSprite, frogX, frogY, 30, 22);
            lives--;
            frogX = 200;
            frogY = 530;
            status = "dead";
            if (lives == 0) {
                // Display losing message
                ctx.drawImage(gameOverSprite, 85, 170, 280, 280);
                newGameBtn.style.display = "inline-block";
            }
        }
    }

    return true;
}
