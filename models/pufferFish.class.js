class Puffer extends MoveableObject {

    height = 60;
    width = 60;

    constructor() {
        super().loadImage('assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');

        this.x = 50 + Math.random() * 500;
    }

}