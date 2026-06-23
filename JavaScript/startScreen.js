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
    btnY = canvas.height / 2 - 50;
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
    } else if (clickX >= policyBtnX && clickX <= policyBtnX + smallBtnW &&
        clickY >= policyBtnY && clickY <= policyBtnY + smallBtnH) {
        window.open('./policy.html', '_blank');
    } else if (clickX >= introBtnX && clickX <= introBtnX + smallBtnW &&
        clickY >= introBtnY && clickY <= introBtnY + smallBtnH) {
        openIntroOverlay();
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeIntroOverlay();
});