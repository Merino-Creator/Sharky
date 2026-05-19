class MoveableObject {
    x = 20;
    y = 70;
    img;
    height = 80;
    width = 80;

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