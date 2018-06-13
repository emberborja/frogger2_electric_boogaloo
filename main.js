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

    ctx.font = '25px VT323';
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