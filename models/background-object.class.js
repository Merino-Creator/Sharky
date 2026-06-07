/**
 * Represents a static background object in the game world.
 * Used to create the parallax scrolling effect.
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {

    width = 720;
    height = 480;

    /**
     * Creates a new BackgroundObject instance.
     * @param {string} imagePath - Path to the background image file.
     * @param {number} x - The x position of the background object in the game world.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}