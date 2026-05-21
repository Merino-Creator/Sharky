class Light extends MoveableObject {

    y = 1;

    constructor(path, x) {
        super().loadImage(path);
        this.x = x;
    }
}