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

    applyGravity() {
        let gravityId = setInterval(() => {
            this.y += this.speedY;
            this.speedY += this.acceleration;
        }, 1000 / 30);
        intervalIds.push(gravityId);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.ImageCache[path];
        this.currentImage++;
    }

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

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    characterHit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    enemyHit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveUP() {
        this.y -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
    }

    moveUpDown() {
        let movingUp = true;

        let upDownId = setInterval(() => {
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

    shootBubble(world) {
        if (!this.isAttacking && !this.isHurt()) {
            this.isAttacking = true;
            this.currentImage = 0;

            setTimeout(() => {
                let bubble = new Bubble(
                    this.x + this.offset.left + 140,
                    this.y + this.offset.top + 25
                );
                world.bubble.push(bubble);
                this.isAttacking = false;
            }, 800);
        }
    }
}