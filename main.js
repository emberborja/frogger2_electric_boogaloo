var game = document.getElementById('game');
var ctx = game.getContext('2d');
var sprites = new Image();
sprites.src = 'assets/frogger-sprites.png';
var score = 0;
var highScore = 0;

var frogPos = {
    posX: undefined,
    posY: undefined
};

window.addEventListener('keydown',
    function(event) {
        var keypress = event.keyCode;
        move();
    })

var lives = 3;


function paint() {

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
    ctx.fillText('' + score + '', 10, 35);
    ctx.fillText('' + highScore + '', 300, 35);
}

paint();


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
}

function play() {
    this.posX = 220;
    this.posY = 540;


    ctx.fillText('HIGH SCORE', 250, 18);
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

    ctx.drawImage(sprites, 80, 262, 27, 28, 200, 500, 27, 28);



}

function move() {
    if (keypress == 37) {
        frogPos[posX] -= 40;
    }
    if (keypress == 38) {
        frogPos[posY] -= 40;
    }
    if (keypress == 39) {
        frogPos[posX] += 40;
    }
    if (keypress == 40) {
        frogPos[posY] += 40;
    }
}