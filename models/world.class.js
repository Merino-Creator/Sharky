let lightX = Math.random() * 400;

class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    toxicAmount = 0;
    coinAmount = 0;
    healthAmount = 0;
    throwableObject = [];

    constructor(canvas) {
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
        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0); // alle vorher bewegt sich mit der spielwelt, alles danach mit der kamera!

        this.addObjectsToMap(this.level.UI);
        this.level.UI[0].drawValue(this.ctx, this.toxicAmount, 70, 70);
        this.level.UI[1].drawValue(this.ctx, this.character.energy, 170, 70);
        this.level.UI[2].drawValue(this.ctx, this.coinAmount, 290, 72);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    checks() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrow();
        }, 255);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
            }
        });

        this.level.toxic.forEach((toxic, index) => {
            if (this.character.isColliding(toxic)) {
                this.toxicAmount++;
                this.level.toxic.splice(index, 1);
            }
        });

        this.level.coin.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coinAmount++;
                this.level.coin.splice(index, 1);
            }
        });
    }

    checkThrow() {
        if(this.keyboard.SPACE) {
            let bubble = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObject.push(bubble);
        }
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