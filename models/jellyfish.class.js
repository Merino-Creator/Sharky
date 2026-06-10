/**
 * Represents a Jellyfish enemy that moves up and down within defined boundaries.
 * Becomes aggressive when reduced to 25 energy, increasing its damage output.
 * @extends MoveableObject
 */
class Jellyfish extends MoveableObject {

    static usedPositions = [];
    energy = 50;
    damage = 25;

    JELLY_AGRESSIVE_AUDIO = new Audio('assets/8.Audio/jellyfish-agressive.mp3');
    JELLY_DEAD_AUDIO = new Audio('assets/8.Audio/jellyfish-dead.mp3');

    IMAGES_JELLY = [
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    IMAGES_JELLY_DEAD = [
        '/assets/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        '/assets/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        '/assets/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        '/assets/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ];

    IMAGES_JELLY_AGRESSIVE = [
        'assets/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
        'assets/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
        'assets/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
        'assets/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png'
    ];

    /**
     * Creates a new Jellyfish instance with a random position in either
     * the top zone (0-160) or bottom zone (300-400) of the canvas.
     */
    constructor() {
        super().loadImage(this.IMAGES_JELLY[0]);
        this.loadImages(this.IMAGES_JELLY);
        this.loadImages(this.IMAGES_JELLY_DEAD);
        this.loadImages(this.IMAGES_JELLY_AGRESSIVE);

        this.x = this.generateX();
        let topZone = Math.random() < 0.5;
        if (topZone) {
            this.y = Math.random() * 160;
            this.yMin = 0;
            this.yMax = 125;
        } else {
            this.y = 300 + Math.random() * 100;
            this.yMin = 300;
            this.yMax = 400;
        }

        this.speed = 1 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Generates a random x position that maintains a minimum distance
     * of 400px from all other Jellyfish positions.
     * @returns {number} A valid x position for the Jellyfish.
     */
    generateX() {
        let x;
        let tooClose;

        do {
            x = 400 + Math.random() * 3300;
            tooClose = Jellyfish.usedPositions.some(pos => Math.abs(pos - x) < 400);
        } while (tooClose);

        Jellyfish.usedPositions.push(x);
        return x;
    }

    /**
     * Starts the animation and movement intervals for the Jellyfish.
     * Switches to aggressive mode when energy reaches 25.
     * Stores all interval IDs for later cleanup.
     */
    animate() {
        let jellyAnimateId = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_JELLY_DEAD);
            } else if (this.energy == 25) {
                this.playAnimation(this.IMAGES_JELLY_AGRESSIVE);
                this.agressiveMode();
            } else {
                this.playAnimation(this.IMAGES_JELLY);
            }
        }, 250);

        intervalIds.push(jellyAnimateId);
        this.moveUpDown();
    }

    /**
     * Sets the Jellyfish to aggressive mode by doubling its damage value.
     * @returns {number} The new damage value in aggressive mode.
     */
    agressiveMode() {
        return this.damage = 50;
    }
}