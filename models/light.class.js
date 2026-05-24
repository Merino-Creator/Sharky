class Light extends MoveableObject {

    y = 1;
    height = 400;
    width = 520;

    constructor(path, x) {
        super().loadImage(path);
        
        this.x = x;
        this.animate();

    }

    animate() {
        setInterval( ()=> {
            this.x -= 0.2;
        }, 1000 / 60);
    }
}