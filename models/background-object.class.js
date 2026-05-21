class BackgroundObject extends MoveableObject {

    width = 720;
    height = 200;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}