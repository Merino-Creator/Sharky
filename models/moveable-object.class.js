/**
 * Represents a moveable object in the game world.
 * Extends DrawableObject with movement, collision and combat functionality.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
    speed = 1;
    otherDirection = false;
    speedY = 0;
    acceleration = 0;
    energy = 100;
    lastHit = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * Applies gravity to the object by continuously increasing its vertical speed.
     * Stores the interval ID for later cleanup.
     */
    applyGravity() {
        let gravityId = setInterval(() => {
            this.y += this.speedY;
            this.speedY += this.acceleration;
        }, 1000 / 30);
        intervalIds.push(gravityId);
    }

    /**
     * Plays the next frame of an animation by cycling through an image array.
     * @param {string[]} images - Array of image paths representing the animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.ImageCache[path];
        this.currentImage++;
    }

    /**
     * Draws the hitbox frame around the object for debugging purposes.
     * Only renders for Character, Puffer, Jellyfish, PoisonBottle and Endboss instances.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Puffer || this instanceof Jellyfish || this instanceof PoisonBottle || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }

    /**
     * Checks if this object is colliding with another object using AABB collision detection.
     * Takes into account the offset of both objects for accurate hitbox calculation.
     * @param {MoveableObject} mo - The object to check collision against.
     * @returns {boolean} True if the objects are colliding.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the character's energy by the given damage amount.
     * Records the time of the hit to enable the hurt state.
     * @param {number} damage - The amount of damage to apply.
     */
    characterHit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.lastHit = new Date().getTime();
    }

    /**
     * Reduces the enemy's energy by the given damage amount.
     * @param {number} damage - The amount of damage to apply.
     */
    enemyHit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.lastHit = new Date().getTime();
    }

    /**
     * Checks if the object is currently in a hurt state.
     * The hurt state lasts for 1 second after being hit.
     * @returns {boolean} True if the object was hit less than 1 second ago.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    bossIsHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.3;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object's energy is 0.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Moves the object to the right by its speed value.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed value.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Moves the object upward by its speed value.
     */
    moveUP() {
        this.y -= this.speed;
    }

    /**
     * Moves the object downward by its speed value.
     */
    moveDown() {
        this.y += this.speed;
    }

    /**
     * Moves the object continuously up and down between yMin and yMax boundaries.
     * Stores the interval ID for later cleanup.
     */
    moveUpDown() {
        let movingUp = true;

        let upDownId = setInterval(() => {
            if (gamePaused) return;
            if (movingUp) {
                this.y -= this.speed;
                if (this.y <= this.yMin) movingUp = false;
            } else {
                this.y += this.speed;
                if (this.y >= this.yMax) movingUp = true;
            }
        }, 1000 / 30);

        intervalIds.push(upDownId);
    }

    /**
     * Fires a bubble projectile if the character is not already attacking,
     * not hurt and facing right. The bubble is created after the attack animation completes.
     * @param {World} world - The game world instance to add the bubble to.
     */
    shootBubble(world) {
        if (!this.isAttacking && !this.isHurt() && !this.otherDirection) {
            this.isAttacking = true;
            this.currentImage = 0;

            setTimeout(() => {
                let bubble;
                if (world.toxicAmount >= 4) {
                    bubble = new ToxicBubble(
                        this.x + this.offset.left + 140,
                        this.y + this.offset.top + 25
                    );
                } else {
                    bubble = new Bubble(
                        this.x + this.offset.left + 140,
                        this.y + this.offset.top + 25
                    );
                }
                world.bubble.push(bubble);
                this.isAttacking = false;
            }, 800);
        }
    }

    /**
     * Performs a slap attack if the character is not already attacking or hurt.
     * Blocks further attacks until the animation completes after 800ms.
     * @param {World} world - The game world instance.
     */
    slap(world) {
        if (!this.isAttacking && !this.isHurt()) {
            this.isAttacking = true;
            this.isSlapAttacking = true;
            this.currentImage = 0;

            setTimeout(() => {
                this.isAttacking = false;
                this.isSlapAttacking = false;
            }, 800);
        }
    }
}