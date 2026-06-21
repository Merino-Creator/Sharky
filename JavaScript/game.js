let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let startCtx;
let startBackground;
let startBtn;
let policyBtn;
let introBtn;
let btnWidth = 200;
let btnHeight = 80;
let btnX;
let btnY;
let smallBtnW = 150;
let smallBtnH = 60;
let policyBtnX, policyBtnY, introBtnX, introBtnY;
let gameOver = false;
let gameWon = false;
let gamePaused = false;

let INGAME_BGM_AUDIO = new Audio('./assets/8.Audio/ingame-bgm.mp3');
INGAME_BGM_AUDIO.loop = true;
let GAME_WON_AUDIO = new Audio('./assets/8.Audio/game-won.mp3');
let GAME_OVER_AUDIO = new Audio('./assets/8.Audio/game-over.mp3');

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
    registerHudEvents();
    introTemplate();
}

/**
 * Preloads all images used on the win and game over screens.
 */
function initEndScreenImages() {
    winBackground.src = './assets/6.Botones/Tittles/You win/Mesa de trabajo 1.png';
    winRestartBtn.src = './assets/6.Botones/Try again/Recurso 16.png';
    winMenuBtn.src = './assets/6.Botones/HOME_button.png';
    gameOverBackground.src = './assets/6.Botones/Tittles/Game Over/Recurso 11.png';
    gameOverRestartBtn.src = './assets/6.Botones/Try again/Recurso 16.png';
    gameOverMenuBtn.src = './assets/6.Botones/HOME_button.png';
}

/**
 * Renders the start screen on the canvas including background, title and buttons.
 */
function showStartScreen() {
    initStartScreen();
    loadStartScreenImages();
    registerStartScreenEvents();
}

/**
 * Initializes all image objects needed for the start screen.
 */
function initStartScreen() {
    startCtx = canvas.getContext('2d');
    startBackground = new Image();
    startBtn = new Image();
    policyBtn = new Image();
    introBtn = new Image();
    initBtnContent();
}

/**
 * Sets image sources and calculates button positions for the start screen.
 */
function initBtnContent() {
    startBackground.src = './assets/3. Background/Dark/2.png';
    startBtn.src = './assets/6.Botones/Start/1.png';
    policyBtn.src = './assets/6.Botones/Impressum_button.png';
    introBtn.src = './assets/6.Botones/Einleitung_button.png';
    btnX = canvas.width / 2 - btnWidth / 2;
    btnY = canvas.height / 2;
    policyBtnX = canvas.width / 2 - smallBtnW - 10;
    policyBtnY = btnY + btnHeight + 20;
    introBtnX = canvas.width / 2 + 10;
    introBtnY = btnY + btnHeight + 20;
}

/**
 * Loads start screen images and triggers initial draw once loaded.
 */
function loadStartScreenImages() {
    startBackground.onload = () => drawStartScreen(false);
    startBtn.onload = () => drawStartScreen(false);
}

/**
 * Draws the start screen with optional hover effect on the buttons.
 * @param {string|boolean} hover - The button currently hovered ('start', 'policy', 'intro' or false).
 */
function drawStartScreen(hover) {
    startCtx.save();
    startCtx.drawImage(startBackground, 0, 0, canvas.width, canvas.height);
    startCtx.font = '60px Luckiest Guy';
    startCtx.fillStyle = 'white';
    startCtx.textAlign = 'center';
    startCtx.fillText('TOXIC WAVES', canvas.width / 2, canvas.height / 2 - 100);
    hoverStartBtn(hover);
    startCtx.restore();
}

/**
 * Draws the start screen buttons with optional hover effects.
 * @param {string|boolean} hover - The button currently hovered ('start', 'policy', 'intro' or false).
 */
function hoverStartBtn(hover) {
    if (hover === 'start') {
        startCtx.drawImage(startBtn, btnX - 10, btnY - 5, btnWidth + 20, btnHeight + 10);
    } else {
        startCtx.drawImage(startBtn, btnX, btnY, btnWidth, btnHeight);
    }
    if (hover === 'policy') {
        startCtx.drawImage(policyBtn, policyBtnX - 5, policyBtnY - 3, smallBtnW + 10, smallBtnH + 6);
    } else {
        startCtx.drawImage(policyBtn, policyBtnX, policyBtnY, smallBtnW, smallBtnH);
    }
    if (hover === 'intro') {
        startCtx.drawImage(introBtn, introBtnX - 5, introBtnY - 3, smallBtnW + 10, smallBtnH + 6);
    } else {
        startCtx.drawImage(introBtn, introBtnX, introBtnY, smallBtnW, smallBtnH);
    }
}

/**
 * Handles mouse movement to detect hover state over the start screen buttons.
 * @param {MouseEvent} event - The mouse move event.
 */
function onMouseMove(event) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;
    mousePosition(rect, mouseX, mouseY);
}

/**
 * Determines which start screen button is hovered and updates the cursor and screen accordingly.
 * @param {DOMRect} rect - The bounding rectangle of the canvas.
 * @param {number} mouseX - The x position of the mouse relative to the canvas.
 * @param {number} mouseY - The y position of the mouse relative to the canvas.
 */
function mousePosition(rect, mouseX, mouseY) {
    if (mouseX >= btnX && mouseX <= btnX + btnWidth && mouseY >= btnY && mouseY <= btnY + btnHeight) {
        drawStartScreen('start');
        canvas.style.cursor = 'pointer';
    } else if (mouseX >= policyBtnX && mouseX <= policyBtnX + smallBtnW && mouseY >= policyBtnY && mouseY <= policyBtnY + smallBtnH) {
        drawStartScreen('policy');
        canvas.style.cursor = 'pointer';
    } else if (mouseX >= introBtnX && mouseX <= introBtnX + smallBtnW && mouseY >= introBtnY && mouseY <= introBtnY + smallBtnH) {
        drawStartScreen('intro');
        canvas.style.cursor = 'pointer';
    } else {
        drawStartScreen(false);
        canvas.style.cursor = 'default';
    }
}

/**
 * Registers all event listeners for the start screen.
 */
function registerStartScreenEvents() {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onStartScreenClick);
    canvas.addEventListener('touchend', onStartScreenTouch, { passive: false });
}

/**
 * Handles click events on the start screen.
 * @param {MouseEvent} event - The click event.
 */
function onStartScreenClick(event) {
    let rect = canvas.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let clickY = event.clientY - rect.top;

    if (clickX >= btnX && clickX <= btnX + btnWidth && clickY >= btnY && clickY <= btnY + btnHeight) {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.style.cursor = 'default';
        startGame();
    } else if (clickX >= policyBtnX && clickX <= policyBtnX + smallBtnW && clickY >= policyBtnY && clickY <= policyBtnY + smallBtnH) {
        window.open('./policy.html', '_blank');
    } else if (clickX >= introBtnX && clickX <= introBtnX + smallBtnW && clickY >= introBtnY && clickY <= introBtnY + smallBtnH) {
        openIntroOverlay();
    }
}

/**
 * Opens the intro overlay.
 */
function openIntroOverlay() {
    document.getElementById('introOverlay').classList.add('visible');
}

/**
 * Closes the intro overlay.
 */
function closeIntroOverlay() {
    document.getElementById('introOverlay').classList.remove('visible');
}

/**
 * Handles touch events on the start screen.
 * @param {TouchEvent} event - The touch event.
 */
function onStartScreenTouch(event) {
    event.preventDefault();
    let touch = event.changedTouches[0];
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
    let clickX = (touch.clientX - rect.left) * scaleX;
    let clickY = (touch.clientY - rect.top) * scaleY;
    checkStartScreenTouch(clickX, clickY);
}

/**
 * Checks if the touch position is within the start button bounds and starts the game.
 * @param {number} clickX - The x position of the touch.
 * @param {number} clickY - The y position of the touch.
 */
function checkStartScreenTouch(clickX, clickY) {
    if (clickX >= btnX && clickX <= btnX + btnWidth &&
        clickY >= btnY && clickY <= btnY + btnHeight) {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('touchend', onStartScreenTouch);
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
        canvas.removeEventListener('click', onStartScreenClick);
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('touchend', onStartScreenTouch);
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
 * Registers all touch event listeners and sets text content for the HUD buttons.
 */
function registerHudEvents() {
    let buttons = [
        { id: 'btnLeft', key: 'LEFT', text: '◀' },
        { id: 'btnRight', key: 'RIGHT', text: '▶' },
        { id: 'btnUp', key: 'UP', text: '▲' },
        { id: 'btnDown', key: 'DOWN', text: '▼' },
        { id: 'btnShoot', key: 'S', text: 'B' },
        { id: 'btnSlap', key: 'D', text: 'S' }
    ];
    registerTouch(buttons);
}

/**
 * Registers touchstart, touchend and contextmenu event listeners for each HUD button.
 * @param {Array} buttons - Array of button objects with id, key and text.
 */
function registerTouch(buttons) {
    buttons.forEach(({ id, key, text }) => {
        let btn = document.getElementById(id);
        btn.textContent = text;
        btn.addEventListener('touchstart', (e) => {
            if (e.cancelable) e.preventDefault();
            keyboard[key] = true;
        }, { passive: false });
        btn.addEventListener('touchend', (e) => {
            if (e.cancelable) e.preventDefault();
            keyboard[key] = false;
        }, { passive: false });
        btn.addEventListener('contextmenu', (e) => e.preventDefault());
    });
}

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
 * Draws the game over screen background and buttons with optional hover effects.
 * @param {boolean} hoverRestart - Whether the mouse is hovering over the restart button.
 * @param {boolean} hoverMenu - Whether the mouse is hovering over the menu button.
 */
function drawGameOverScreen(hoverRestart, hoverMenu) {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let bgWidth = 400;
    let bgHeight = 200;
    let bgX = canvas.width / 2 - bgWidth / 2;
    let bgY = 20;
    ctx.drawImage(gameOverBackground, bgX, bgY, bgWidth, bgHeight);
    gameOverButtonHover(ctx, hoverRestart, hoverMenu);
}

/**
 * Draws the game over buttons with optional hover effects.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {boolean} hoverRestart - Whether the mouse is hovering over the restart button.
 * @param {boolean} hoverMenu - Whether the mouse is hovering over the menu button.
 */
function gameOverButtonHover(ctx, hoverRestart, hoverMenu) {
    if (hoverRestart) {
        ctx.drawImage(gameOverRestartBtn, gameOverRestartBtnX - 10, gameOverRestartBtnY - 5, gameOverRestartBtnW + 20, gameOverRestartBtnH + 10);
    } else {
        ctx.drawImage(gameOverRestartBtn, gameOverRestartBtnX, gameOverRestartBtnY, gameOverRestartBtnW, gameOverRestartBtnH);
    }
    if (hoverMenu) {
        ctx.drawImage(gameOverMenuBtn, gameOverMenuBtnX - 10, gameOverMenuBtnY - 5, gameOverMenuBtnW + 20, gameOverMenuBtnH + 10);
    } else {
        ctx.drawImage(gameOverMenuBtn, gameOverMenuBtnX, gameOverMenuBtnY, gameOverMenuBtnW, gameOverMenuBtnH);
    }
}

/**
 * Renders the game over screen and registers click and mousemove event listeners.
 * Removes existing listeners first to prevent stacking.
 */
function showGameOverScreen() {
    canvas.removeEventListener('click', onGameOverScreenClick);
    canvas.removeEventListener('mousemove', onGameOverMouseMove);
    gameOverRestartBtnX = canvas.width / 2 - gameOverRestartBtnW / 2;
    gameOverRestartBtnY = canvas.height / 2;
    gameOverMenuBtnX = canvas.width / 2 - gameOverMenuBtnW / 2;
    gameOverMenuBtnY = canvas.height / 2 + 100;
    drawGameOverScreen(false, false);
    canvas.addEventListener('mousemove', onGameOverMouseMove);
    canvas.addEventListener('click', onGameOverScreenClick);
}

/**
 * Handles mouse movement on the game over screen to detect hover states.
 * @param {MouseEvent} event - The mouse move event.
 */
function onGameOverMouseMove(event) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;
    let hoverRestart = mouseX >= gameOverRestartBtnX && mouseX <= gameOverRestartBtnX + gameOverRestartBtnW &&
        mouseY >= gameOverRestartBtnY && mouseY <= gameOverRestartBtnY + gameOverRestartBtnH;
    let hoverMenu = mouseX >= gameOverMenuBtnX && mouseX <= gameOverMenuBtnX + gameOverMenuBtnW &&
        mouseY >= gameOverMenuBtnY && mouseY <= gameOverMenuBtnY + gameOverMenuBtnH;
    drawGameOverScreen(hoverRestart, hoverMenu);
    canvas.style.cursor = (hoverRestart || hoverMenu) ? 'pointer' : 'default';
}

/**
 * Handles click events on the game over screen.
 * @param {MouseEvent} event - The click event.
 */
function onGameOverScreenClick(event) {
    let rect = canvas.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let clickY = event.clientY - rect.top;
    checkGameOverTouch(clickX, clickY);
}

/**
 * Checks if the click position matches the restart or menu button on the game over screen.
 * @param {number} clickX - The x position of the click.
 * @param {number} clickY - The y position of the click.
 */
function checkGameOverTouch(clickX, clickY) {
    if (clickX >= gameOverRestartBtnX && clickX <= gameOverRestartBtnX + gameOverRestartBtnW &&
        clickY >= gameOverRestartBtnY && clickY <= gameOverRestartBtnY + gameOverRestartBtnH) {
        canvas.removeEventListener('click', onGameOverScreenClick);
        canvas.removeEventListener('mousemove', onGameOverMouseMove);
        restartGame();
    }
    if (clickX >= gameOverMenuBtnX && clickX <= gameOverMenuBtnX + gameOverMenuBtnW &&
        clickY >= gameOverMenuBtnY && clickY <= gameOverMenuBtnY + gameOverMenuBtnH) {
        canvas.removeEventListener('click', onGameOverScreenClick);
        canvas.removeEventListener('mousemove', onGameOverMouseMove);
        backToMenu();
    }
}

/**
 * Stops the game and shows the win screen.
 */
function winGame() {
    stopGame();
    gameWon = true;
    INGAME_BGM_AUDIO.pause();
    showWinScreen();
    GAME_WON_AUDIO.play();
    registerAudio(GAME_WON_AUDIO);
}

/**
 * Draws the win screen background and buttons with optional hover effects.
 * @param {boolean} hoverRestart - Whether the mouse is hovering over the restart button.
 * @param {boolean} hoverMenu - Whether the mouse is hovering over the menu button.
 */
function drawWinScreen(hoverRestart, hoverMenu) {
    let ctx = canvas.getContext('2d');
    ctx.drawImage(winBackground, 0, 0, canvas.width, canvas.height);
    if (hoverRestart) {
        ctx.drawImage(winRestartBtn, winRestartBtnX - 10, winRestartBtnY - 5, winRestartBtnW + 20, winRestartBtnH + 10);
    } else {
        ctx.drawImage(winRestartBtn, winRestartBtnX, winRestartBtnY, winRestartBtnW, winRestartBtnH);
    }
    if (hoverMenu) {
        ctx.drawImage(winMenuBtn, winMenuBtnX - 10, winMenuBtnY - 5, winMenuBtnW + 20, winMenuBtnH + 10);
    } else {
        ctx.drawImage(winMenuBtn, winMenuBtnX, winMenuBtnY, winMenuBtnW, winMenuBtnH);
    }
}

/**
 * Renders the win screen and registers click and mousemove event listeners.
 */
function showWinScreen() {
    winRestartBtnX = canvas.width / 2 - winRestartBtnW / 2;
    winRestartBtnY = canvas.height / 4;
    winMenuBtnX = canvas.width / 2 - winMenuBtnW / 2;
    winMenuBtnY = canvas.height / 4 + 220;
    drawWinScreen(false, false);
    canvas.addEventListener('mousemove', onWinMouseMove);
    canvas.addEventListener('click', onWinScreenClick);
}

/**
 * Handles mouse movement on the win screen to detect hover states.
 * @param {MouseEvent} event - The mouse move event.
 */
function onWinMouseMove(event) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;
    let hoverRestart = mouseX >= winRestartBtnX && mouseX <= winRestartBtnX + winRestartBtnW &&
        mouseY >= winRestartBtnY && mouseY <= winRestartBtnY + winRestartBtnH;
    let hoverMenu = mouseX >= winMenuBtnX && mouseX <= winMenuBtnX + winMenuBtnW &&
        mouseY >= winMenuBtnY && mouseY <= winMenuBtnY + winMenuBtnH;
    drawWinScreen(hoverRestart, hoverMenu);
    canvas.style.cursor = (hoverRestart || hoverMenu) ? 'pointer' : 'default';
}

/**
 * Handles click events on the win screen.
 * @param {MouseEvent} event - The click event.
 */
function onWinScreenClick(event) {
    let rect = canvas.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let clickY = event.clientY - rect.top;
    checkWinScreenClick(clickX, clickY);
}

/**
 * Checks if the click position matches the restart or menu button on the win screen.
 * @param {number} clickX - The x position of the click.
 * @param {number} clickY - The y position of the click.
 */
function checkWinScreenClick(clickX, clickY) {
    if (clickX >= winRestartBtnX && clickX <= winRestartBtnX + winRestartBtnW &&
        clickY >= winRestartBtnY && clickY <= winRestartBtnY + winRestartBtnH) {
        canvas.removeEventListener('click', onWinScreenClick);
        canvas.removeEventListener('mousemove', onWinMouseMove);
        restartGame();
    }
    if (clickX >= winMenuBtnX && clickX <= winMenuBtnX + winMenuBtnW &&
        clickY >= winMenuBtnY && clickY <= winMenuBtnY + winMenuBtnH) {
        canvas.removeEventListener('click', onWinScreenClick);
        canvas.removeEventListener('mousemove', onWinMouseMove);
        backToMenu();
    }
}

/**
 * Resets all game states, audio and static arrays to their initial values.
 * Also resets the looseGameTriggered and winGameTriggered flags on the world instance.
 */
function resetGame() {
    if (world) {
        world.looseGameTriggered = false;
        world.winGameTriggered = false;
    }
    gameStarted = false;
    gameOver = false;
    gameWon = false;
    resetArrays();
    resetAudio();
    closeIntroOverlay();
    world = null;
}

/**
 * Resets all interval, audio and static position arrays to their initial empty state.
 */
function resetArrays() {
    intervalIds = [];
    allAudio = [];
    Puffer.usedPositions = [];
    Jellyfish.usedPositions = [];
    Coins.usedPositions = [];
    PoisonBottle.usedPositions = [];
}

/**
 * Pauses and resets all main game audio objects.
 */
function resetAudio() {
    [INGAME_BGM_AUDIO, GAME_OVER_AUDIO, GAME_WON_AUDIO].forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

/**
 * Returns to the start screen by resetting all game states.
 */
function backToMenu() {
    resetGame();
    showStartScreen();
}

/**
 * Restarts the game by resetting all states and reinitializing the world.
 */
function restartGame() {
    resetGame();
    gameStarted = true;
    initLevel();
    world = new World(canvas);
    INGAME_BGM_AUDIO.play();
    registerAudio(INGAME_BGM_AUDIO);
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

/**
 * Toggles the info menu visibility and pauses/resumes the game.
 */
function toggleInfoMenu() {
    let infoMenu = document.getElementById('infoMenu');
    infoMenu.classList.toggle('visible');

    if (gameStarted && !gameOver && !gameWon) {
        gamePaused = !gamePaused;
        if (gamePaused) {
            INGAME_BGM_AUDIO.pause();
        } else {
            INGAME_BGM_AUDIO.play();
        }
    }
}

/**
 * Renders the intro overlay template into the intro content container.
 */
function introTemplate() {
    let introRef = document.getElementById('introContent');
    introRef.innerHTML += introOverlayTemplate();
}