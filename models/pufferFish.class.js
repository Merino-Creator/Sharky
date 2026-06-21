/**
 * Represents a Puffer fish enemy that swims left and periodically enters attack mode.
 * Can be killed instantly by the character's slap attack.
 * @extends MoveableObject
 */
class Puffer extends MoveableObject {

    static usedPositions = [];
    energy = 50;
    damage = 10;

    /**
     * Creates a new Puffer instance with a random position, speed and default swim state.
     */
    constructor() {
        super().loadImage('./assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.state = 'swim';
        this.x = this.generateX();
        this.y = 240;
        this.speed = 1 + Math.random() * 0.25;
        this.fetchPufferImages();
    }

    /**
     * Fetches all puffer animation image paths from the JSON file,
     * assigns them to the corresponding image arrays and starts the animation.
     */
    async fetchPufferImages() {
        let response = await fetch('./jsons/puffer-images.json');
        let images = await response.json();

        this.IMAGES_PUFFER_SWIM = images.swim;
        this.IMAGES_PUFFER_TRANSITION = images.transition;
        this.IMAGES_PUFFER_ATTACK = images.attack;
        this.IMAGES_DEAD = images.dead;

        this.loadPufferImages();
        this.animate();
    }

    /**
     * Preloads all puffer animation images into the ImageCache.
     */
    loadPufferImages() {
        this.loadImages(this.IMAGES_PUFFER_SWIM);
        this.loadImages(this.IMAGES_PUFFER_TRANSITION);
        this.loadImages(this.IMAGES_PUFFER_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
    }

    /**
     * Generates a random x position that maintains a minimum distance
     * of 400px from all other Puffer positions.
     * @returns {number} A valid x position for the Puffer.
     */
    generateX() {
        let x;
        let tooClose;

        do {
            x = 400 + Math.random() * 3300;
            tooClose = Puffer.usedPositions.some(pos => Math.abs(pos - x) < 200);
        } while (tooClose);
        Puffer.usedPositions.push(x);
        return x;
    }

    /**
     * Starts all animation and movement intervals for the Puffer.
     * Triggers state changes every 6 seconds and continuously checks
     * the current animation and movement.
     * Stores all interval IDs for later cleanup.
     */
    animate() {
        let pufferAttackTriggerId = setInterval(() => {
            this.checkPufferState();
        }, 6000);
        intervalIds.push(pufferAttackTriggerId);

        let pufferAnimateId = setInterval(() => {
            this.checkAnimation();
        }, 150);
        intervalIds.push(pufferAnimateId);

        let pufferMoveLeftId = setInterval(() => {
            if (gamePaused) return;
            this.moveLeft();
        }, 1000 / 30);
        intervalIds.push(pufferMoveLeftId);
    }

    /**
     * Cycles the Puffer through transition and attack states before returning to swim.
     * Transition lasts 2 seconds, attack lasts 3 seconds.
     */
    checkPufferState() {
        this.state = 'transition';
        setTimeout(() => {
            this.state = 'attack';
            setTimeout(() => {
                this.state = 'swim';
            }, 3000);
        }, 2000);
    }

    /**
     * Determines and plays the correct animation based on the current Puffer state.
     * Priority order: dead/slapped > transition > attack > swim.
     * Returns early when the game is paused.
     */
    checkAnimation() {
        if (gamePaused) return;
        if (this.isSlapped || this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.state === 'transition') {
            this.playAnimation(this.IMAGES_PUFFER_TRANSITION);
        } else if (this.state === 'attack') {
            this.playAnimation(this.IMAGES_PUFFER_ATTACK);
            this.attackMode();
        } else {
            this.playAnimation(this.IMAGES_PUFFER_SWIM);
            this.damage = 10;
        }
    }

    /**
     * Sets the Puffer to attack mode by doubling its damage value.
     * @returns {number} The new damage value in attack mode.
     */
    attackMode() {
        return this.damage = 20;
    }

    /**
     * Triggers the slap effect on the Puffer, sending it flying off screen
     * to the upper left direction.
     * Stores the interval ID for later cleanup.
     */
    getSlapped() {
        this.isSlapped = true;
        this.speedX = -16;
        this.speedY = -16;

        let slappedId = setInterval(() => {
            this.x += this.speedX;
            this.y += this.speedY;
        }, 1000 / 30);
        intervalIds.push(slappedId);
    }
}