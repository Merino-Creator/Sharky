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

        this.x = 200 + Math.random() * 500;
        this.y = 240;

        this.animate();
    }

    animate() {
        setInterval( () => {
            let i = this.currentImage % this.IMAGES_ENEMY.length;
            let path = this.IMAGES_ENEMY[i];
            this.img = this.ImageCache[path];
            this.currentImage++;
        }, 255);
    }

}