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