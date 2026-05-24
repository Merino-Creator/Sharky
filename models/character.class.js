class Character extends MoveableObject {

    x = 20;
    y = 160;
    height = 160;
    width = 120;
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
        setInterval( () => {
            let i = this.currentImage % this.IMAGES_CHARACTER.length;
            let path = this.IMAGES_CHARACTER[i];
            this.img = this.ImageCache[path];
            this.currentImage++;
        }, 255);
    }

    jump() {

    }
}