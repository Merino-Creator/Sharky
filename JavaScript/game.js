let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;

function init() {
    canvas = document.getElementById('canvas');
    showStartScreen();
}

function showStartScreen() {
    let ctx = canvas.getContext('2d');
    let background = new Image();
    let startBtn = new Image();

    background.src = '/assets/3. Background/Dark/2.png';
    startBtn.src = '/assets/6.Botones/Start/1.png';

    let btnWidth = 200;
    let btnHeight = 80;
    let btnX = canvas.width / 2 - btnWidth / 2;
    let btnY = canvas.height / 2;

    function drawStartScreen(hover) {
        ctx.save();
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.font = '60px Luckiest Guy';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('AND THE TOXIC WHALE', canvas.width / 2, canvas.height / 2 - 100);

        if (hover) {
            ctx.drawImage(startBtn, btnX - 10, btnY - 5, btnWidth + 20, btnHeight + 10);
        } else {
            ctx.drawImage(startBtn, btnX, btnY, btnWidth, btnHeight);
        }

        ctx.restore();
    }

    function onMouseMove(event) {
        let rect = canvas.getBoundingClientRect();
        let mouseX = event.clientX - rect.left;
        let mouseY = event.clientY - rect.top;

        let hover = mouseX >= btnX && mouseX <= btnX + btnWidth &&
            mouseY >= btnY && mouseY <= btnY + btnHeight;

        drawStartScreen(hover);
        canvas.style.cursor = hover ? 'pointer' : 'default';
    }

    background.onload = () => drawStartScreen(false);
    startBtn.onload = () => drawStartScreen(false);

    canvas.addEventListener('mousemove', onMouseMove);

    canvas.addEventListener('click', (event) => {
        let rect = canvas.getBoundingClientRect();
        let clickX = event.clientX - rect.left;
        let clickY = event.clientY - rect.top;

        if (clickX >= btnX && clickX <= btnX + btnWidth &&
            clickY >= btnY && clickY <= btnY + btnHeight) {
            canvas.removeEventListener('mousemove', onMouseMove);
            canvas.style.cursor = 'default';
            startGame();
        }
    });
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        initLevel();
        world = new World(canvas);
    }
}

window.addEventListener('keydown', (event) => {
    event.preventDefault();

    if (event.keyCode == 13) startGame();

    if (event.keyCode == 39) keyboard.RIGHT = true;
    if (event.keyCode == 37) keyboard.LEFT = true;
    if (event.keyCode == 38) keyboard.UP = true;
    if (event.keyCode == 40) keyboard.DOWN = true;
    if (event.keyCode == 83) keyboard.S = true;
    if (event.keyCode == 68) keyboard.D = true;
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 83) keyboard.S = false;
    if (event.keyCode == 68) keyboard.D = false;
});

function stopGame() {
    intervalIds.forEach(clearInterval);
}