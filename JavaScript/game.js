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

let isMuted = localStorage.getItem('muted') === 'true';
let allAudio = [];

let winBackground = new Image();
let winRestartBtn = new Image();
let winMenuBtn = new Image();
let winRestartBtnX, winRestartBtnY, winMenuBtnX, winMenuBtnY;
let winRestartBtnW = 200, winRestartBtnH = 80;
let winMenuBtnW = 200, winMenuBtnH = 80;

let gameOverBackground = new Image();
let gameOverRestartBtn = new Image();
let gameOverMenuBtn = new Image();
let gameOverRestartBtnX, gameOverRestartBtnY, gameOverMenuBtnX, gameOverMenuBtnY;
let gameOverRestartBtnW = 200, gameOverRestartBtnH = 80;
let gameOverMenuBtnW = 200, gameOverMenuBtnH = 80;

/**
 * Initializes the game by getting the canvas element and showing the start screen.
 */
function init() {
    canvas = document.getElementById('canvas');
    applyMuteState();
    showStartScreen();
    initEndScreenImages();
}

/**
 * Preloads all images used on the win and game over screens.
 */
function initEndScreenImages() {
    winBackground.src = '/assets/6.Botones/Tittles/You win/Mesa de trabajo 1.png';
    winRestartBtn.src = '/assets/6.Botones/Try again/Recurso 16.png';
    winMenuBtn.src = '/assets/6.Botones/Try again/Recurso 16.png';
    gameOverBackground.src = '/assets/6.Botones/Tittles/Game Over/Recurso 11.png';
    gameOverRestartBtn.src = '/assets/6.Botones/Try again/Recurso 16.png';
    gameOverMenuBtn.src = '/assets/6.Botones/Try again/Recurso 16.png';
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
        registerAudio(INGAME_BGM_AUDIO);
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
    registerAudio(GAME_OVER_AUDIO);
    showGameOverScreen();
}

/**
 * Renders the game over screen with background image and restart/menu buttons.
 */
function showGameOverScreen() {
    let ctx = canvas.getContext('2d');
    ctx.drawImage(gameOverBackground, 0, 0, canvas.width, canvas.height);

    gameOverRestartBtnX = canvas.width / 2 - gameOverRestartBtnW / 2;
    gameOverRestartBtnY = canvas.height / 2;
    gameOverMenuBtnX = canvas.width / 2 - gameOverMenuBtnW / 2;
    gameOverMenuBtnY = canvas.height / 2 + 100;

    ctx.drawImage(gameOverRestartBtn, gameOverRestartBtnX, gameOverRestartBtnY, gameOverRestartBtnW, gameOverRestartBtnH);
    ctx.drawImage(gameOverMenuBtn, gameOverMenuBtnX, gameOverMenuBtnY, gameOverMenuBtnW, gameOverMenuBtnH);

    canvas.addEventListener('click', onGameOverScreenClick);
}

/**
 * Handles click events on the game over screen.
 * @param {MouseEvent} event - The click event.
 */
function onGameOverScreenClick(event) {
    let rect = canvas.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let clickY = event.clientY - rect.top;

    if (clickX >= gameOverRestartBtnX && clickX <= gameOverRestartBtnX + gameOverRestartBtnW &&
        clickY >= gameOverRestartBtnY && clickY <= gameOverRestartBtnY + gameOverRestartBtnH) {
        canvas.removeEventListener('click', onGameOverScreenClick);
        restartGame();
    }

    if (clickX >= gameOverMenuBtnX && clickX <= gameOverMenuBtnX + gameOverMenuBtnW &&
        clickY >= gameOverMenuBtnY && clickY <= gameOverMenuBtnY + gameOverMenuBtnH) {
        canvas.removeEventListener('click', onGameOverScreenClick);
        backToMenu();
    }
}

/**
 * Stops the game and shows the win screen.
 */
function winGame() {
    stopGame();
    gameWon = true;
    showWinScreen();
    GAME_WON_AUDIO.play();
    registerAudio(GAME_WON_AUDIO);
}

/**
 * Renders the win screen with background image and restart/menu buttons.
 */
function showWinScreen() {
    let ctx = canvas.getContext('2d');
    ctx.drawImage(winBackground, 0, 0, canvas.width, canvas.height);

    winRestartBtnX = canvas.width / 2 - winRestartBtnW / 2;
    winRestartBtnY = canvas.height / 2;
    winMenuBtnX = canvas.width / 2 - winMenuBtnW / 2;
    winMenuBtnY = canvas.height / 2 + 100;

    ctx.drawImage(winRestartBtn, winRestartBtnX, winRestartBtnY, winRestartBtnW, winRestartBtnH);
    ctx.drawImage(winMenuBtn, winMenuBtnX, winMenuBtnY, winMenuBtnW, winMenuBtnH);

    canvas.addEventListener('click', onWinScreenClick);
}

/**
 * Handles click events on the win screen.
 * @param {MouseEvent} event - The click event.
 */
function onWinScreenClick(event) {
    let rect = canvas.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let clickY = event.clientY - rect.top;

    if (clickX >= winRestartBtnX && clickX <= winRestartBtnX + winRestartBtnW &&
        clickY >= winRestartBtnY && clickY <= winRestartBtnY + winRestartBtnH) {
        canvas.removeEventListener('click', onWinScreenClick);
        restartGame();
    }

    if (clickX >= winMenuBtnX && clickX <= winMenuBtnX + winMenuBtnW &&
        clickY >= winMenuBtnY && clickY <= winMenuBtnY + winMenuBtnH) {
        canvas.removeEventListener('click', onWinScreenClick);
        backToMenu();
    }
}

/**
 * Restarts the game by resetting all states and reinitializing the world.
 */
function restartGame() {
    gameStarted = false;
    gameOver = false;
    gameWon = false;
    intervalIds = [];
    allAudio = [];
    INGAME_BGM_AUDIO.currentTime = 0;
    GAME_OVER_AUDIO.currentTime = 0;
    GAME_WON_AUDIO.currentTime = 0;
    initLevel();
    world = new World(canvas);
    INGAME_BGM_AUDIO.play();
    registerAudio(INGAME_BGM_AUDIO);
}

/**
 * Returns to the start screen by resetting all game states.
 */
function backToMenu() {
    gameStarted = false;
    gameOver = false;
    gameWon = false;
    intervalIds = [];
    allAudio = [];
    INGAME_BGM_AUDIO.pause();
    GAME_OVER_AUDIO.pause();
    GAME_WON_AUDIO.pause();
    showStartScreen();
}

/**
 * Registers an audio object to be controlled by the mute function.
 * @param {HTMLAudioElement} audio - The audio object to register.
 */
function registerAudio(audio) {
    allAudio.push(audio);
    audio.muted = isMuted;
}

/**
 * Toggles the mute state for all registered audio objects.
 */
function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('muted', isMuted);
    allAudio.forEach(audio => audio.muted = isMuted);
    document.getElementById('muteBtn').textContent = isMuted ? '🔇' : '🔊';
}

/**
 * Applies the saved mute state to all registered audio objects.
 */
function applyMuteState() {
    allAudio.forEach(audio => audio.muted = isMuted);
    document.getElementById('muteBtn').textContent = isMuted ? '🔇' : '🔊';
}