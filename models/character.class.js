class Character extends MoveableObject {

    x = 20;
    y = 160;
    height = 160;
    width = 120;
    speed = 10;
    world;

    IMAGES_CHARACTER = [
        './assets/1.Sharkie/3.Swim/1.png',
        './assets/1.Sharkie/3.Swim/2.png',
        './assets/1.Sharkie/3.Swim/3.png',
        './assets/1.Sharkie/3.Swim/4.png',
        './assets/1.Sharkie/3.Swim/5.png',
        './assets/1.Sharkie/3.Swim/6.png'

    ];

    constructor() {
        super().loadImage('./assets/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_CHARACTER);

        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }

            if (this.world.keyboard.UP) {
                this.y -= this.speed;
            }

            if (this.world.keyboard.DOWN) {
                this.y += this.speed;
            }

            this.world.camera_x = -this.x + 40;
        }, 1000 / 30);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.x += this.speed;

                let i = this.currentImage % this.IMAGES_CHARACTER.length;
                let path = this.IMAGES_CHARACTER[i];
                this.img = this.ImageCache[path];
                this.currentImage++;
            }
        }, 100);
    }

    jump() {

    }
}