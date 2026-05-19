class MoveableObject {
    x = 20;
    y = 70;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('moving right');
        
    }

    moveLeft() {
        
    }
}