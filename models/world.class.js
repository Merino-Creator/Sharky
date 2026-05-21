class World {

    character = new Character();
    enemies = [
        new Puffer(),
        new Puffer(),
        new Puffer(),
        new Puffer()
    ];
    lights = [
        new Light()
    ];
    backgroundObjects = [
        new BackgroundObject('assets/3. Background/Layers/2. Floor/D.png', 0)
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addToMap(this.character);

        this.addObjectsToMap(this.lights);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.backgroundObjects);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}