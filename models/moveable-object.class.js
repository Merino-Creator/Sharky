class MoveableObject {
    img;
    height = 80;
    width = 80;
    currentImage = 0;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.01;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    ImageCache = {};

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(grr) {
        grr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.ImageCache[path] = img;
        });
    }

    applyGravity() {
        setInterval(() => {
            this.y += this.speedY;
            this.speedY += this.acceleration;
        }, 1000 / 60);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.ImageCache[path];
        this.currentImage++;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Puffer || this instanceof Jellyfish || this instanceof PoisonBottle) {
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

        setInterval(() => {
            if (movingUp) {
                this.y -= this.speed;
                if (this.y <= this.yMin) movingUp = false;
            } else {
                this.y += this.speed;
                if (this.y >= this.yMax) movingUp = true;
            }
        }, 1000 / 60);
    }
}