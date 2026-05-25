class Endboss extends MoveableObject {

    y = -20;
    height = 450;
    width = 500;

    IMAGES_ENDBOSS = [
        'assets/2.Enemy/3 Final Enemy/2.floating/1.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/2.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/3.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/4.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/5.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/6.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/7.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/8.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/9.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/10.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/11.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/12.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/13.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_ENDBOSS[0]);
        this.loadImages(this.IMAGES_ENDBOSS);
        this.x = 2000;
        this.animate();
    };

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ENDBOSS);
        }, 255);
    };

}