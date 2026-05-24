class Light extends MoveableObject {

    y = 1;
    height = 400;
    width = 520;
    speed = 0.2;

    constructor(path, x) {
        super().loadImage(path);
        
        this.x = x;
        this.animate();

    }

    animate() {
        this.moveLeft();
    }

    moveLeft() {
        setInterval( ()=> {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}