let canvas;
let ctx;
let character = new Image();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    character.src = "./assets/1.Sharkie/1.IDLE/1.png";

    ctx.drawImage(character, 20, 20, 50, 150);
    
}