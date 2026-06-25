let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let gameOver = false;
let gameWon = false;
let gamePaused = false;

let INGAME_BGM_AUDIO = new Audio('./assets/8.Audio/ingame-bgm.mp3');
INGAME_BGM_AUDIO.loop = true;
let GAME_WON_AUDIO = new Audio('./assets/8.Audio/game-won.mp3');
let GAME_OVER_AUDIO = new Audio('./assets/8.Audio/game-over.mp3');

let isMuted = localStorage.getItem('muted') === 'true';
let allAudio = [];

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
    policyTemplate();
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
    closeOverlay();
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

function policyTemplate() {
    let policyRef = document.getElementById('policyContent');
    policyRef.innerHTML += policyOverlayTemplate();
}