let lightX = Math.random() *400;

class World {

    character = new Character();
    enemies = [
        new Puffer(),
        new Puffer(),
        new Puffer(),
        new Puffer()
    ];
    lights = [
        new Light('assets/3. Background/Layers/1. Light/1.png', lightX),
        new Light('assets/3. Background/Layers/1. Light/2.png', lightX + 80)
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

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.lights);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

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