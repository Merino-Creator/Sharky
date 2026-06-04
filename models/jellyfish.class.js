class Jellyfish extends MoveableObject {

    static usedPositions = [];
    energy = 50;
    damage = 25;

    IMAGES_JELLY = [
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    IMAGES_JELLY_DEAD = [
        '/assets/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        '/assets/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        '/assets/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        '/assets/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ]

    IMAGES_JELLY_AGRESSIVE = [
        'assets/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
        'assets/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
        'assets/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
        'assets/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES_JELLY[0]);
        this.loadImages(this.IMAGES_JELLY);
        this.loadImages(this.IMAGES_JELLY_DEAD);
        this.loadImages(this.IMAGES_JELLY_AGRESSIVE);

        this.x = this.generateX();
        let topZone = Math.random() < 0.5;
        if (topZone) {
            this.y = Math.random() * 160;
            this.yMin = 0;
            this.yMax = 125;
        } else {
            this.y = 300 + Math.random() * 100;
            this.yMin = 300;
            this.yMax = 400;
        }

        this.speed = 1 + Math.random() * 0.25;

        this.animate();
    }

    generateX() {
        let x;
        let tooClose;

        do {
            x = 250 + Math.random() * 3300;
            tooClose = Jellyfish.usedPositions.some(pos => Math.abs(pos - x) < 200);
        } while (tooClose);

        Jellyfish.usedPositions.push(x);
        return x;
    }

    animate() {
        let jellyAnimateId = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_JELLY_DEAD);
            } else if (this.energy == 25) {
                this.playAnimation(this.IMAGES_JELLY_AGRESSIVE);
                this.agressiveMode();
            } else {
                this.playAnimation(this.IMAGES_JELLY);
            }
        }, 250);


        intervalIds.push(jellyAnimateId);

        this.moveUpDown();
    }

    agressiveMode() {
        return this.damage = 50;
    }
}