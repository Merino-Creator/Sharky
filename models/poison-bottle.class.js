/**
 * Represents a collectible poison bottle that falls from above.
 * Position and acceleration are set externally by the World on spawn.
 * @extends MoveableObject
 */
class PoisonBottle extends MoveableObject {

    width = 70;
    y = -80;
    speedY = 1;
    acceleration = 0.1;

    IMAGES_POISON_BOTTLE = [
        './assets/4. Marcadores/Posión/Animada/1.png',
        './assets/4. Marcadores/Posión/Animada/2.png',
        './assets/4. Marcadores/Posión/Animada/3.png',
        './assets/4. Marcadores/Posión/Animada/4.png',
        './assets/4. Marcadores/Posión/Animada/5.png',
        './assets/4. Marcadores/Posión/Animada/6.png',
        './assets/4. Marcadores/Posión/Animada/7.png',
        './assets/4. Marcadores/Posión/Animada/8.png'
    ];

    /**
     * Creates a new PoisonBottle instance.
     * @param {number} x - The x position of the bottle.
     * @param {number} acceleration - The fall acceleration of the bottle.
     */
    constructor(x, acceleration) {
        super().loadImage('./assets/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES_POISON_BOTTLE);
        this.x = x;
        this.acceleration = acceleration;
    }

    /**
     * Updates the bottle position and animation each frame.
     * Called externally by the World's bottle movement interval.
     */
    updateBottle() {
        this.y += this.speedY;
        this.speedY += this.acceleration;
        this.playAnimation(this.IMAGES_POISON_BOTTLE);
    }

    /**
     * Checks if the bottle has fallen below the canvas.
     * @returns {boolean} True if the bottle is below y 600.
     */
    isOutOfBounds() {
        return this.y > 600;
    }
}