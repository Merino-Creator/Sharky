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

        this.x = 200 + Math.random() * 3500;
        let topZone = Math.random() < 0.5;
        if (topZone) {
            this.y = Math.random() * 160;
            this.yMin = 0;
            this.yMax = 125;
        } else {
            this.y = 300 + Math.random() * 100;
            this.yMin = 300;
            this.yMax = 400;
        }

        this.speed = 1 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_JELLY);
        }, 250);

        this.moveUpDown();
    }
}