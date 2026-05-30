class Character extends MoveableObject {

    x = 20;
    y = 100;
    height = 260;
    width = 220;
    speed = 10;
    world;
    lastKeyPress = new Date().getTime();

    offset = {
        top: 110,
        bottom: 60,
        left: 40,
        right: 40
    };

    IMAGES_SWIM = [
        './assets/1.Sharkie/3.Swim/1.png',
        './assets/1.Sharkie/3.Swim/2.png',
        './assets/1.Sharkie/3.Swim/3.png',
        './assets/1.Sharkie/3.Swim/4.png',
        './assets/1.Sharkie/3.Swim/5.png',
        './assets/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_IDLE = [
        'assets/1.Sharkie/1.IDLE/1.png',
        'assets/1.Sharkie/1.IDLE/2.png',
        'assets/1.Sharkie/1.IDLE/3.png',
        'assets/1.Sharkie/1.IDLE/4.png',
        'assets/1.Sharkie/1.IDLE/5.png',
        'assets/1.Sharkie/1.IDLE/6.png',
        'assets/1.Sharkie/1.IDLE/7.png',
        'assets/1.Sharkie/1.IDLE/8.png',
        'assets/1.Sharkie/1.IDLE/9.png',
        'assets/1.Sharkie/1.IDLE/10.png',
        'assets/1.Sharkie/1.IDLE/11.png',
        'assets/1.Sharkie/1.IDLE/12.png',
        'assets/1.Sharkie/1.IDLE/13.png',
        'assets/1.Sharkie/1.IDLE/14.png',
        'assets/1.Sharkie/1.IDLE/15.png',
        'assets/1.Sharkie/1.IDLE/16.png',
        'assets/1.Sharkie/1.IDLE/17.png',
        'assets/1.Sharkie/1.IDLE/18.png'
    ];

    IMAGES_LONG_IDLE = [
        'assets/1.Sharkie/2.Long_IDLE/i1.png',
        'assets/1.Sharkie/2.Long_IDLE/i2.png',
        'assets/1.Sharkie/2.Long_IDLE/i3.png',
        'assets/1.Sharkie/2.Long_IDLE/i4.png',
        'assets/1.Sharkie/2.Long_IDLE/i5.png',
        'assets/1.Sharkie/2.Long_IDLE/i6.png',
        'assets/1.Sharkie/2.Long_IDLE/i7.png',
        'assets/1.Sharkie/2.Long_IDLE/i8.png',
        'assets/1.Sharkie/2.Long_IDLE/i9.png',
        'assets/1.Sharkie/2.Long_IDLE/i10.png',
        'assets/1.Sharkie/2.Long_IDLE/i11.png',
        'assets/1.Sharkie/2.Long_IDLE/i12.png',
        'assets/1.Sharkie/2.Long_IDLE/i13.png',
        'assets/1.Sharkie/2.Long_IDLE/i14.png'
    ];

    IMAGES_DEAD = [
        'assets/1.Sharkie/6.dead/1.Poisoned/1.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/2.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/3.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/4.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/5.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/6.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/7.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/8.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/9.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/10.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/11.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/12.png'
    ]

    constructor() {
        super().loadImage('./assets/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_DEAD);

        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.lastKeyPress = new Date().getTime();
                //this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.lastKeyPress = new Date().getTime();
                //this.walking_sound.play();
            }

            if (this.world.keyboard.UP && this.y > -120) {
                this.moveUP();
                this.lastKeyPress = new Date().getTime();
                //this.walking_sound.play();
            }

            if (this.world.keyboard.DOWN && this.y < 280) {
                this.moveDown();
                this.lastKeyPress = new Date().getTime();
                //this.walking_sound.play();
            }

            this.world.camera_x = -this.x + 40;
        }, 1000 / 30);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.playAnimation(this.IMAGES_SWIM);
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isLongIdle()) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 100);
    }

    isLongIdle() {
        let timePassed = new Date().getTime() - this.lastKeyPress;
        return timePassed > 6000;
    }
}