class Puffer extends MoveableObject {

    static usedPositions = [];
    energy = 50;
    damage = 10;

    IMAGES_PUFFER_SWIM = [
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    IMAGES_PUFFER_ATTACK = [
        '/assets/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        '/assets/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        '/assets/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        '/assets/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        '/assets/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png'
    ]

    constructor() {
        super().loadImage('assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_PUFFER_SWIM);
        this.loadImages(this.IMAGES_PUFFER_ATTACK);

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
        let isAttacking = false;

        let pufferAttackTriggerId = setInterval(() => {
            isAttacking = true;
            setTimeout(() => {
                isAttacking = false;
            }, 5 * 250);
        }, 3000);

        intervalIds.push(pufferAttackTriggerId);

        let pufferAnimateId = setInterval(() => {
            if (isAttacking) {
                this.playAnimation(this.IMAGES_PUFFER_ATTACK);
            } else {
                this.playAnimation(this.IMAGES_PUFFER_SWIM);
            }
        }, 250);

        intervalIds.push(pufferAnimateId);

        let pufferMoveLeftId = setInterval(() => {
            this.moveLeft();
        }, 1000 / 30);

        intervalIds.push(pufferMoveLeftId);
    }

}