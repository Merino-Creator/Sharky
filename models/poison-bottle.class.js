/**
 * Represents a collectible poison bottle that falls from above using gravity.
 * Randomly placed across the level with a minimum distance between bottles.
 * @extends MoveableObject
 */
class PoisonBottle extends MoveableObject {

    static usedPositions = [];
    width = 70;
    y = -80;
    acceleration = 0.05;

    IMAGES_POISON_BOTTLE = [
        'assets/4. Marcadores/Posión/Animada/1.png',
        'assets/4. Marcadores/Posión/Animada/2.png',
        'assets/4. Marcadores/Posión/Animada/3.png',
        'assets/4. Marcadores/Posión/Animada/4.png',
        'assets/4. Marcadores/Posión/Animada/5.png',
        'assets/4. Marcadores/Posión/Animada/6.png',
        'assets/4. Marcadores/Posión/Animada/7.png',
        'assets/4. Marcadores/Posión/Animada/8.png',
    ];

    /**
     * Creates a new PoisonBottle instance at a random x position
     * and starts falling via gravity.
     */
    constructor() {
        super().loadImage('assets/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES_POISON_BOTTLE);
        this.x = this.generateX();
        this.applyGravity();
        this.animate();
    }

    /**
     * Generates a random x position that maintains a minimum distance
     * of 200px from all other PoisonBottle positions.
     * @returns {number} A valid x position for the PoisonBottle.
     */
    generateX() {
        let x;
        let tooClose;

        do {
            x = 250 + Math.random() * 3300;
            tooClose = PoisonBottle.usedPositions.some(pos => Math.abs(pos - x) < 200);
        } while (tooClose);

        PoisonBottle.usedPositions.push(x);
        return x;
    }

    /**
     * Starts the bottle animation loop.
     * Stores the interval ID for later cleanup.
     */
    animate() {
        let poisonBottleId = setInterval(() => {
            this.playAnimation(this.IMAGES_POISON_BOTTLE);
        }, 250);

        intervalIds.push(poisonBottleId);
    }
}