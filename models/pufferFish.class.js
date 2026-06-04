class Puffer extends MoveableObject {

    static usedPositions = [];

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

        this.x = this.generateX();
        this.y = 240;

        this.speed = 1 + Math.random() * 0.25;

        this.animate();
    }

    generateX() {
        let x;
        let tooClose;

        do {
            x = 250 + Math.random() * 3300;
            tooClose = Puffer.usedPositions.some(pos => Math.abs(pos - x) < 200);
        } while (tooClose);

        Puffer.usedPositions.push(x);
        return x;
    }

    animate() {
        let pufferAnimateId = setInterval(() => {
            this.playAnimation(this.IMAGES_ENEMY);
        }, 250);

        intervalIds.push(pufferAnimateId);

        let pufferMoveLeftId = setInterval(() => {
            this.moveLeft();
        }, 1000 / 30);

        intervalIds.push(pufferMoveLeftId);
    }

}