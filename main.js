var game = document.getElementById('game');
var ctx = game.getContext('2d');
var sprites = new Image();
sprites.src = 'assets/frogger-sprites.png';

function paint() {

    ctx.fillStyle = '#4d94ff';
    ctx.fillRect(0, 40, 600, 240);

    ctx.fillStyle = '#404040';
    ctx.fillRect(0, 320, 600, 200);

    ctx.drawImage(sprites, 0, 120, 399, 35, 0, 520, 440, 44);
    ctx.drawImage(sprites, 0, 120, 399, 35, 0, 280, 440, 44);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 600, 40);
    ctx.fillRect(0, 560, 600, 40);

    ctx.font = '48px serif';
    ctx.strokeText('Hello world', 50, 100);
}

paint();