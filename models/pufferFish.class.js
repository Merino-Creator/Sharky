class Puffer extends MoveableObject {

    IMAGES_ENEMY = [
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    constructor() {
        super().loadImage('assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_ENEMY);

        this.x = 200 + Math.random() * 2000;
        this.y = 240;

        this.speed = 0.2 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        setInterval( () => {
            this.playAnimation(this.IMAGES_ENEMY);
        }, 255);

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

}