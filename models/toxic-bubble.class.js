/**
 * Represents a toxic bubble projectile with increased damage against the Endboss.
 * Only available when the player has collected 5 or more poison bottles.
 * @extends Bubble
 */
class ToxicBubble extends Bubble {

    damage = 100;

    /**
     * Creates a new ToxicBubble instance and immediately throws it.
     * @param {number} x - The starting x position.
     * @param {number} y - The starting y position.
     */
    constructor(x, y) {
        super(x, y);
        this.loadImage('./assets/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
    }
}