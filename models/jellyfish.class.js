class Jellyfish extends MoveableObject {

    IMAGES_JELLY = [
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_JELLY[0]);
        this.loadImages(this.IMAGES_JELLY);

        this.x = 200 + Math.random() * 500;
        this.y = 0 + Math.random() * 160

        this.speed = 0.2 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        setInterval( () => {
            this.playAnimation(this.IMAGES_JELLY);
        }, 255);

        this.moveUpDown();
    }
}