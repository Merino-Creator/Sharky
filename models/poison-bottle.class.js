class PoisonBottle extends MoveableObject {

    static usedPositions = [];

    width = 70;
    y = -80;
    acceleration = 0.01;

    IMAGES_POISON_BOTTLE = [
        'assets/4. Marcadores/Posión/Animada/1.png',
        'assets/4. Marcadores/Posión/Animada/2.png',
        'assets/4. Marcadores/Posión/Animada/3.png',
        'assets/4. Marcadores/Posión/Animada/4.png',
        'assets/4. Marcadores/Posión/Animada/5.png',
        'assets/4. Marcadores/Posión/Animada/6.png',
        'assets/4. Marcadores/Posión/Animada/7.png',
        'assets/4. Marcadores/Posión/Animada/8.png',
    ];

    constructor() {
        super().loadImage('assets/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES_POISON_BOTTLE); 

        this.x = this.generateX();

        this.applyGravity();
        this.animate();
    }

    generateX() {
        let x;
        let tooClose;

        do {
            x = 250 + Math.random() * 3300;
            tooClose = PoisonBottle.usedPositions.some(pos => Math.abs(pos - x) < 200);
        } while (tooClose);

        PoisonBottle.usedPositions.push(x);
        return x;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_POISON_BOTTLE);
        }, 250);

    }
}