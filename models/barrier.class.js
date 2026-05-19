class Barrier extends MoveableObject {

    height = 80;
    width = 80;

    constructor() {
        super().loadImage('assets/3. Background/Barrier/1.png');

        this.x = Math.random() * 700;
    }
}