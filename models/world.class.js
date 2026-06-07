/**
 * Represents the game world containing all game objects and game logic.
 */
class World {

    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    toxicAmount = 0;
    coinAmount = 0;
    healthAmount = 0;
    bubble = [];
    coins;

    /**
     * Creates a new World instance and initializes the game.
     * @param {HTMLCanvasElement} canvas - The canvas element to render the game on.
     */
    constructor(canvas) {
        this.level = level1;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.checks();
    }

    /**
     * Assigns the world reference to the character for access to keyboard and level data.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Main render loop. Clears the canvas and draws all game objects each frame.
     * Objects drawn before the camera reset move with the game world.
     * Objects drawn after the camera reset stay fixed on screen.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.toxic);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.bubble);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        this.addObjectsToMap(this.level.UI);
        this.level.UI[0].drawValue(this.ctx, this.toxicAmount, 70, 70);
        this.level.UI[1].drawValue(this.ctx, this.character.energy, 160, 70);
        this.level.UI[2].drawValue(this.ctx, this.coinAmount, 290, 72);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Starts all collision detection intervals for enemies, bubbles, collectibles and slap attacks.
     * Stores all interval IDs for later cleanup.
     */
    checks() {
        let enemyCollisionId = setInterval(() => {
            this.checkEnemyCollisions();
        }, 100);
        intervalIds.push(enemyCollisionId);

        let bubbleCollisionId = setInterval(() => {
            this.checkBubbleCollisions();
        }, 120);
        intervalIds.push(bubbleCollisionId);

        let collectibleCollisionId = setInterval(() => {
            this.checkCollectibles();
        }, 100);
        intervalIds.push(collectibleCollisionId);

        let slapCollisionId = setInterval(() => {
            this.checkSlapCollisions();
        }, 100);
        intervalIds.push(slapCollisionId);
    }

    /**
     * Checks collisions between the character and all enemies.
     * Character is invulnerable while slapping a Puffer or while already hurt.
     * Triggers game over if the character dies.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            let isInvulnerable = enemy instanceof Puffer && this.character.isSlapAttacking;

            if (this.character.isColliding(enemy) && !enemy.isDead() && !isInvulnerable && !this.character.isHurt()) {
                this.character.characterHit(enemy.damage);
                if (this.character.isDead()) {
                    this.character.timeDied = new Date().getTime();
                    setTimeout(() => stopGame(), 1800);
                }
            }
        });
    }

    /**
     * Checks collisions between bubbles and enemies.
     * Bubbles deal damage to Jellyfish and are removed on impact.
     * Dead enemies are removed from the level after 1 second.
     */
    checkBubbleCollisions() {
        if (this.bubble.length === 0) return;

        this.level.enemies.forEach((enemy) => {
            this.bubble.forEach((bubble, bubbleIndex) => {
                if (bubble.isColliding(enemy)) {
                    if (enemy instanceof Jellyfish) {
                        enemy.enemyHit(bubble.damage);
                    }
                    this.bubble.splice(bubbleIndex, 1);
                }

                if (enemy.isDead()) {
                    setTimeout(() => {
                        let index = this.level.enemies.indexOf(enemy);
                        if (index > -1) this.level.enemies.splice(index, 1);
                    }, 1000);
                }
            });
        });
    }

    /**
     * Checks collisions between the character's slap attack and Puffer enemies.
     * Instantly kills the Puffer and sends it flying off screen.
     * Removes the Puffer from the level after 1 second.
     */
    checkSlapCollisions() {
        if (!this.character.isSlapAttacking) return;

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                if (enemy instanceof Puffer) {
                    enemy.enemyHit(enemy.energy);
                    enemy.getSlapped();
                    setTimeout(() => {
                        let index = this.level.enemies.indexOf(enemy);
                        if (index > -1) this.level.enemies.splice(index, 1);
                    }, 1000);
                }
            }
        });
    }

    /**
     * Checks collisions between the character and all collectible objects.
     * Increments the toxic and coin counters and removes collected objects.
     */
    checkCollectibles() {
        this.level.toxic.forEach((toxic, index) => {
            if (this.character.isColliding(toxic)) {
                this.toxicAmount++;
                this.level.toxic.splice(index, 1);
            }
        });

        this.level.coins.forEach((coins, index) => {
            if (this.character.isColliding(coins)) {
                this.coinAmount++;
                this.level.coins.splice(index, 1);
            }
        });
    }

    /**
     * Draws all objects in an array onto the canvas.
     * @param {MoveableObject[]} objects - Array of objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a single object onto the canvas.
     * Handles image flipping for objects moving in the opposite direction.
     * @param {MoveableObject} mo - The object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the canvas context horizontally to mirror an object's image.
     * @param {MoveableObject} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the canvas context after flipping and resets the object's x position.
     * @param {MoveableObject} mo - The object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}