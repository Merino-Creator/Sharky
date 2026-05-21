class Light extends MoveableObject {

    y = 1;

    constructor() {
        super().loadImage('assets/3. Background/Layers/1. Light/1.png');

        this.x = Math.random() * 700;
    }
}