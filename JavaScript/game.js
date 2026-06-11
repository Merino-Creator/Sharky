let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let startCtx;
let startBackground;
let startBtn;
let btnWidth = 200;
let btnHeight = 80;
let btnX;
let btnY;
let gameOver = false;
let gameWon = false;

let INGAME_BGM_AUDIO = new Audio('assets/8.Audio/ingame-bgm.mp3');
let GAME_WON_AUDIO = new Audio('assets/8.Audio/game-won.mp3');
let GAME_OVER_AUDIO = new Audio('assets/8.Audio/game-over.mp3');

/**
 * Initializes the game by getting the canvas element and showing the start screen.
 */
function init() {
    canvas = document.getElementById('canvas');
    showStartScreen();
}

/**
 * Renders the start screen on the canvas including background, title and start button.
 */
function showStartScreen() {
    initStartScreen();
    loadStartScreenImages();
    registerStartScreenEvents();
}

/**
 * Initializes all variables needed for the start screen.
 */
function initStartScreen() {
    startCtx = canvas.getContext('2d');
    startBackground = new Image();
    startBtn = new Image();
    startBackground.src = '/assets/3. Background/Dark/2.png';
    startBtn.src = '/assets/6.Botones/Start/1.png';
    btnX = canvas.width / 2 - btnWidth / 2;
    btnY = canvas.height / 2;
}

/**
 * Loads start screen images and triggers initial draw.
 */
function loadStartScreenImages() {
    startBackground.onload = () => drawStartScreen(false);
    startBtn.onload = () => drawStartScreen(false);
}

/**
 * Draws the start screen with optional hover effect on the start button.
 * @param {boolean} hover - Whether the mouse is hovering over the start button.
 */
function drawStartScreen(hover) {
    startCtx.save();
    startCtx.drawImage(startBackground, 0, 0, canvas.width, canvas.height);
    startCtx.font = '60px Luckiest Guy';
    startCtx.fillStyle = 'white';
    startCtx.textAlign = 'center';
    startCtx.fillText('AND THE TOXIC WHALE', canvas.width / 2, canvas.height / 2 - 100);
    if (hover) {
        startCtx.drawImage(startBtn, btnX - 10, btnY - 5, btnWidth + 20, btnHeight + 10);
    } else {
        startCtx.drawImage(startBtn, btnX, btnY, btnWidth, btnHeight);
    }
    startCtx.restore();
}

/**
 * Handles mouse movement to detect hover state over the start button.
 * @param {MouseEvent} event - The mouse move event.
 */
function onMouseMove(event) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;
    let hover = mouseX >= btnX && mouseX <= btnX + btnWidth &&
        mouseY >= btnY && mouseY <= btnY + btnHeight;
    drawStartScreen(hover);
    canvas.style.cursor = hover ? 'pointer' : 'default';
}

/**
 * Registers all event listeners for the start screen.
 */
function registerStartScreenEvents() {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onStartScreenClick);
}

/**
 * Handles click events on the start screen.
 * @param {MouseEvent} event - The click event.
 */
function onStartScreenClick(event) {
    let rect = canvas.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let clickY = event.clientY - rect.top;
    if (clickX >= btnX && clickX <= btnX + btnWidth &&
        clickY >= btnY && clickY <= btnY + btnHeight) {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.style.cursor = 'default';
        startGame();
    }
}

/**
 * Starts the game by initializing the level and creating the world.
 * Ensures the game can only be started once.
 */
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        initLevel();
        world = new World(canvas);
        INGAME_BGM_AUDIO.play();
    }
}

/**
 * Handles keydown events to control the character and start the game.
 * @param {KeyboardEvent} event - The keyboard event.
 */
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

/**
 * Handles keyup events to stop character movement.
 * @param {KeyboardEvent} event - The keyboard event.
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 83) keyboard.S = false;
    if (event.keyCode == 68) keyboard.D = false;
});

/**
 * Stops the game by clearing all active intervals.
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
}

/**
 * Stops the game and shows the game over screen.
 */
function looseGame() {
    stopGame();
    gameOver = true;
    INGAME_BGM_AUDIO.pause();
    GAME_OVER_AUDIO.play();
    showGameOverScreen();
}

/**
 * Renders the game over screen on the canvas.
 */
function showGameOverScreen() {
    let ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '60px Luckiest Guy';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
    ctx.restore();
}

/**
 * Stops the game and shows the win screen.
 */
function winGame() {
    stopGame();
    gameWon = true;
    showWinScreen();
    GAME_WON_AUDIO.play();
}

/**
 * Renders the win screen on the canvas.
 */
function showWinScreen() {
    let ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '60px Luckiest Guy';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2);
    ctx.restore();
}