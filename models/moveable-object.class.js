class MoveableObject {
    img;
    height = 80;
    width = 80;
    currentImage = 0;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.01;

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
        setInterval(() =>{
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

    moveRight() {

    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
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