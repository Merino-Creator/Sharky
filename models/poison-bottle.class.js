class PoisonBottle extends MoveableObject {

    width = 70;
    y = 370;

    constructor() {
        super().loadImage('assets/4. Marcadores/Posión/Dark - Right.png') 

        this.x = 200 + Math.random() * 2000;
    }
}