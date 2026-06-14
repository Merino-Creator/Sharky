/**
 * Represents a Puffer fish enemy that swims left and periodically enters attack mode.
 * Can be killed instantly by the character's slap attack.
 * @extends MoveableObject
 */
class Puffer extends MoveableObject {

    static usedPositions = [];
    energy = 50;
    damage = 10;

    IMAGES_PUFFER_SWIM = [
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    IMAGES_PUFFER_TRANSITION = [
        '/assets/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        '/assets/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        '/assets/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        '/assets/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        '/assets/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png'
    ];

    IMAGES_PUFFER_ATTACK = [
        '/assets/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        '/assets/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        '/assets/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        '/assets/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        '/assets/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png'
    ];

    IMAGES_DEAD = [
        '/assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png'
    ];

    /**
     * Creates a new Puffer instance with a random position and speed.
     */
    constructor() {
        super().loadImage('assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_PUFFER_SWIM);
        this.loadImages(this.IMAGES_PUFFER_TRANSITION);
        this.loadImages(this.IMAGES_PUFFER_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.generateX();
        this.y = 240;
        this.speed = 1 + Math.random() * 0.25;
        this.animate();
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
            tooClose = Puffer.usedPositions.some(pos => Math.abs(pos - x) < 400);
        } while (tooClose);
        Puffer.usedPositions.push(x);
        return x;
    }

    /**
     * Starts all animation and movement intervals for the Puffer.
     * Cycles through swim, transition and attack states every 6 seconds.
     * Stores all interval IDs for later cleanup.
     */
    animate() {
        let state = 'swim';

        let pufferAttackTriggerId = setInterval(() => {
            state = 'transition';
            setTimeout(() => {
                state = 'attack';
                setTimeout(() => {
                    state = 'swim';
                }, 3000);
            }, 2000);
        }, 6000);
        intervalIds.push(pufferAttackTriggerId);

        let pufferAnimateId = setInterval(() => {
            if (this.isSlapped || this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (state === 'transition') {
                this.playAnimation(this.IMAGES_PUFFER_TRANSITION);
            } else if (state === 'attack') {
                this.playAnimation(this.IMAGES_PUFFER_ATTACK);
                this.attackMode();
            } else {
                this.playAnimation(this.IMAGES_PUFFER_SWIM);
                this.damage = 10;
            }
        }, 150);
        intervalIds.push(pufferAnimateId);

        let pufferMoveLeftId = setInterval(() => {
            if (gamePaused) return;
            this.moveLeft();
        }, 1000 / 30);
        intervalIds.push(pufferMoveLeftId);
    }

    /**
     * Sets the Puffer to attack mode by increasing its damage value.
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