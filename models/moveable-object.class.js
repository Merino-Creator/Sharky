class MoveableObject {
    img;
    height = 80;
    width = 80;
    currentImage = 0;
    speed = 0.2;

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

    moveRight() {
        console.log('moving right');

    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}