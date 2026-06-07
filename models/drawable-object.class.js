let intervalIds = [];

/**
 * Base class for all drawable objects in the game.
 */
class DrawableObject {
    img;
    height = 80;
    width = 80;
    currentImage = 0;
    ImageCache = {};

    /**
     * Loads a single image and assigns it to the img property.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images into the ImageCache for animation use.
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
     * Draws the object onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the hitbox frame around the object for debugging purposes.
     * Empty by default - overridden in MoveableObject for specific enemy types.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {}
}