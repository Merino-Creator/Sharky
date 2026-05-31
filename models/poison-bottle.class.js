class PoisonBottle extends MoveableObject {

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

        this.x = 200 + Math.random() * 3500;

        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_POISON_BOTTLE);
        }, 250);

    }
}