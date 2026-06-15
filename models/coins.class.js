/**
 * Represents a collectible coin object in the game world.
 * Coins are randomly placed and animate continuously.
 * @extends MoveableObject
 */
class Coins extends MoveableObject {

    height = 50;
    width = 50;
    static usedPositions = [];

    IMAGES_COINS = [
        './assets/4. Marcadores/1. Coins/1.png',
        './assets/4. Marcadores/1. Coins/2.png',
        './assets/4. Marcadores/1. Coins/3.png',
        './assets/4. Marcadores/1. Coins/4.png'
    ];

    /**
     * Creates a new Coins instance with a random position ensuring
     * minimum distance between coins.
     */
    constructor() {
        super().loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.x = this.generateX();
        this.y = 50 + Math.random() * 300;
        this.animate();
    }

    /**
     * Generates a random x position that maintains a minimum distance
     * of 100px from all other coin positions.
     * @returns {number} A valid x position for the coin.
     */
    generateX() {
        let x;
        let tooClose;

        do {
            x = 250 + Math.random() * 3300;
            tooClose = Coins.usedPositions.some(pos => Math.abs(pos - x) < 100);
        } while (tooClose);

        Coins.usedPositions.push(x);
        return x;
    }

    /**
     * Starts the coin animation loop.
     * Stores the interval ID for later cleanup.
     */
    animate() {
        let coinId = setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 250);

        intervalIds.push(coinId);
    }
}