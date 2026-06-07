/**
 * Represents a bubble projectile fired by the character.
 * Moves horizontally to the right after being thrown.
 * @extends MoveableObject
 */
class Bubble extends MoveableObject {

    height = 50;
    width = 50;
    acceleration = 1;
    damage = 25;

    /**
     * Creates a new Bubble instance and immediately throws it.
     * @param {number} x - The starting x position of the bubble.
     * @param {number} y - The starting y position of the bubble.
     */
    constructor(x, y) {
        super().loadImage('assets/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.throw();
    }

    /**
     * Moves the bubble continuously to the right.
     * Stores the interval ID for later cleanup.
     */
    throw() {
        let throwId = setInterval(() => {
            this.x += 10;
        }, 1000 / 60);

        intervalIds.push(throwId);
    }
}