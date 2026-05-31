class Coins extends MoveableObject {

    height = 50;
    width = 50;

    IMAGES_COINS = [
        '/assets/4. Marcadores/1. Coins/1.png',
        '/assets/4. Marcadores/1. Coins/2.png',
        '/assets/4. Marcadores/1. Coins/3.png',
        '/assets/4. Marcadores/1. Coins/4.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);

        this.x = 200 + Math.random() * 2000;
        this.y = 50 + Math.random() * 300;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 255);
    }
}