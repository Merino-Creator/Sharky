class Light extends MoveableObject {

    y = 1;
    static sharedX = Math.random() * 3000;
    height = 400;
    width = 520;
    speed = 0.2;

    constructor(path, offset = 0) {
        super().loadImage(path);
        this.x = Light.sharedX + offset;

        this.animate();
    }

    animate() {
        this.moveLeft();
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}