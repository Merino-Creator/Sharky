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

    constructor(canvas) {
        this.level = level1;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.checks();
    }

    setWorld() {
        this.character.world = this;
    }

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

        this.ctx.translate(-this.camera_x, 0); // alle vorher bewegt sich mit der spielwelt, alles danach mit der kamera!

        this.addObjectsToMap(this.level.UI);
        this.level.UI[0].drawValue(this.ctx, this.toxicAmount, 70, 70);
        this.level.UI[1].drawValue(this.ctx, this.character.energy, 160, 70);
        this.level.UI[2].drawValue(this.ctx, this.coinAmount, 290, 72);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

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

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}