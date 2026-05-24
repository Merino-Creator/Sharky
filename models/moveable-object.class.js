class MoveableObject {
    img;
    height = 80;
    width = 80;

    ImageCache = {};

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(grr) {
        grr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.ImageCache[path] = path;
        });
    }

    moveRight() {
        console.log('moving right');

    }

    moveLeft() {

    }
}