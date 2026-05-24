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
        new Light('assets/3. Background/Layers/1. Light/2.png', lightX + 520)
    ];

    backgroundObjects = [
        new BackgroundObject('assets/3. Background/Layers/5. Water/D.png', 0),
        new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D.png', 0),
        new BackgroundObject('assets/3. Background/Layers/4.Fondo 2/D.png', 0),
        new BackgroundObject('assets/3. Background/Layers/2. Floor/D.png', 0),
    ];

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.lights);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

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
        if(mo.otherDirection){
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}