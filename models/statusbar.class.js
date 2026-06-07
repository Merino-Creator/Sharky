/**
 * Represents a statusbar UI element displayed on the canvas.
 * Base class for all statusbar icons like Health, Toxic and CoinAmount.
 * @extends DrawableObject
 */
class Statusbar extends DrawableObject {
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * Loads a single image and assigns it to the img property.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images into the ImageCache.
     * @param {string[]} grr - Array of image file paths to preload.
     */
    loadImages(grr) {
        grr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.ImageCache[path] = img;
        });
    }

    /**
     * Draws a text value next to the statusbar icon.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number} value - The value to display.
     * @param {number} x - The x position of the text.
     * @param {number} y - The y position of the text.
     */
    drawValue(ctx, value, x, y) {
        ctx.font = 'normal 40px Luckiest_Guy';
        ctx.fillStyle = 'white';
        ctx.fillText(value, x, y);
    }

    /**
     * Draws the statusbar icon on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}