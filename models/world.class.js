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
    lastBottleX = 0;

    TOXIC_BUBBLING_AUDIO = new Audio('./assets/8.Audio/toxic-bubbling.mp3');
    TOXIC_COLLECT_AUDIO = new Audio('./assets/8.Audio/toxic-collect.mp3');
    COIN_COLLECT_AUDIO = new Audio('./assets/8.Audio/coin-sound.mp3');
    SLAP_AUDIO = new Audio('./assets/8.Audio/slap.mp3');

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
     * Stops the loop and shows the appropriate end screen when the game is over.
     */
    draw() {
        if (gamePaused) {
            requestAnimationFrame(() => this.draw());
            return;
        }

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

        if (gameOver) {
            showGameOverScreen();
            return;
        }

        if (gameWon) {
            showWinScreen();
            return;
        }

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Starts all collision detection and game logic intervals.
     * Stores all interval IDs for later cleanup.
     */
    checks() {
        this.checkEnemyCollision();
        this.checkBubbleCollision();
        this.checkCollectibleCollision();
        this.checkSlapCollision();
        this.checkBottleMovement();
        this.spawnBottle();
    }

    checkEnemyCollision() {
        let enemyCollisionId = setInterval(() => {
            if (gamePaused) return;
            this.checkEnemyCollisions();
        }, 100);
        intervalIds.push(enemyCollisionId);
    }

    checkBubbleCollision() {
        let bubbleCollisionId = setInterval(() => {
            if (gamePaused) return;
            this.checkBubbleCollisions();
        }, 120);
        intervalIds.push(bubbleCollisionId);
    }

    checkCollectibleCollision() {
        let collectibleCollisionId = setInterval(() => {
            if (gamePaused) return;
            this.checkCollectibles();
        }, 100);
        intervalIds.push(collectibleCollisionId);
    }

    checkSlapCollision() {
        let slapCollisionId = setInterval(() => {
            if (gamePaused) return;
            this.checkSlapCollisions();
        }, 100);
        intervalIds.push(slapCollisionId);
    }

    checkBottleMovement() {
        let bottleMoveId = setInterval(() => {
            if (gamePaused) return;
            this.level.toxic.forEach(bottle => bottle.updateBottle());
            this.level.toxic = this.level.toxic.filter(bottle => !bottle.isOutOfBounds());
        }, 1000 / 30);
        intervalIds.push(bottleMoveId);
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
                    setTimeout(() => looseGame(), 1400);
                }
            }
        });
    }

    /**
     * Checks collisions between bubbles and enemies.
     * Bubbles deal damage to Jellyfish and ToxicBubbles deal damage to the Endboss.
     * Triggers win condition when the Endboss dies.
     * Other dead enemies are removed from the level after 1 second.
     */
    checkBubbleCollisions() {
        if (this.bubble.length === 0) return;

        this.level.enemies.forEach((enemy) => {
            this.bubble.forEach((bubble, bubbleIndex) => {
                if (bubble.isColliding(enemy)) {
                    this.checkEnemyType(enemy, bubble, bubbleIndex);
                }

                if (enemy.isDead()) {
                    this.checkEnemyCondition(enemy);
                }
            });
        });
    }

    checkEnemyType(enemy, bubble, bubbleIndex) {
        if (enemy instanceof Jellyfish) {
            enemy.enemyHit(bubble.damage);
        } else if (enemy instanceof Endboss && bubble instanceof ToxicBubble) {
            enemy.enemyHit(bubble.damage);
        }
        this.bubble.splice(bubbleIndex, 1);
    }

    checkEnemyCondition(enemy) {
        if (enemy instanceof Endboss) {
            setTimeout(() => winGame(), 1400);
        } else {
            setTimeout(() => {
                let index = this.level.enemies.indexOf(enemy);
                if (index > -1) this.level.enemies.splice(index, 1);
            }, 1000);
        }
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
                    this.slapEnemy(enemy);
                }
            }
        });
    }

    slapEnemy(enemy) {
        enemy.enemyHit(enemy.energy);
        enemy.getSlapped();
        this.SLAP_AUDIO.play();
        registerAudio(this.SLAP_AUDIO);
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) this.level.enemies.splice(index, 1);
        }, 1000);
    }

    /**
     * Checks collisions between the character and all collectible objects.
     * Increments the toxic and coin counters and removes collected objects.
     */
    checkCollectibles() {
        this.level.toxic.forEach((toxic, index) => {
            this.checkToxicCollision(toxic, index);
        });

        this.level.coins.forEach((coins, index) => {
            this.checkCoinCollision(coins, index);
        });
    }

    checkToxicCollision(toxic, index) {
        if (this.character.isColliding(toxic)) {
            this.toxicAmount++;
            this.TOXIC_COLLECT_AUDIO.play();
            registerAudio(this.TOXIC_COLLECT_AUDIO);
            this.level.toxic.splice(index, 1);
        }
    }

    checkCoinCollision(coins, index) {
        if (this.character.isColliding(coins)) {
            this.coinAmount++;
            this.COIN_COLLECT_AUDIO.play();
            registerAudio(this.COIN_COLLECT_AUDIO);
            this.level.coins.splice(index, 1);
        }
    }

    /**
     * Spawns a new poison bottle every 3 seconds at a random position
     * within the visible screen area. Only spawns while character x is below 3000.
     * Each bottle has a randomized fall acceleration.
     */
    spawnBottle() {
        let bottleSpawnId = setInterval(() => {
            if (gamePaused) return;
            if (this.character.x <= 3000) {
                this.bottleSpawnPosition();
            }
        }, 3000);
        intervalIds.push(bottleSpawnId);
    }

    bottleSpawnPosition() {
        let visibleX = -this.camera_x;
        let bottle = new PoisonBottle(
            visibleX + Math.random() * 720,
            0.1 + Math.random() * 0.2
        );
        this.level.toxic.push(bottle);
        this.TOXIC_BUBBLING_AUDIO.play();
        registerAudio(this.TOXIC_BUBBLING_AUDIO);
        setTimeout(() => {
            this.TOXIC_BUBBLING_AUDIO.pause();
        }, 1000);
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