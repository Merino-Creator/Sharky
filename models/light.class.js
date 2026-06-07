/**
 * Represents a light effect object that slowly moves left across the game world.
 * Two Light instances are combined to form one complete light graphic.
 * @extends MoveableObject
 */
class Light extends MoveableObject {

    y = 1;
    static sharedX = Math.random() * 3000;
    height = 400;
    width = 520;
    speed = 1;

    /**
     * Creates a new Light instance.
     * @param {string} path - Path to the light image file.
     * @param {number} [offset=0] - Horizontal offset from the shared x position.
     *                              Use 520 for the second part of the light graphic.
     */
    constructor(path, offset = 0) {
        super().loadImage(path);
        this.x = Light.sharedX + offset;
        this.animate();
    }

    /**
     * Starts the light movement animation.
     */
    animate() {
        this.moveLeft();
    }

    /**
     * Moves the light object continuously to the left.
     * Stores the interval ID for later cleanup.
     */
    moveLeft() {
        let lightId = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 30);
        intervalIds.push(lightId);
    }
}