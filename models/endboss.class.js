/**
 * Represents the final boss enemy (Toxic Whale).
 * Plays an intro animation when the character gets close enough,
 * then periodically attacks by moving toward the character and returning to its start position.
 * @extends MoveableObject
 */
class Endboss extends MoveableObject {

    y = -20;
    height = 450;
    width = 500;
    firstContact = false;
    energy = 1000;
    damage = 50;

    offset = {
        top: 130,
        bottom: 60,
        left: 30,
        right: 40
    };

    IMAGES_BOSS_FLOAT = [
        'assets/2.Enemy/3 Final Enemy/2.floating/1.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/2.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/3.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/4.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/5.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/6.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/7.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/8.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/9.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/10.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/11.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/12.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/13.png',
    ];

    IMAGES_BOSS_INTRO = [
        '/assets/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        '/assets/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        '/assets/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        '/assets/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        '/assets/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        '/assets/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        '/assets/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        '/assets/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        '/assets/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        '/assets/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];

    IMAGES_BOSS_ATTACK = [
        '/assets/2.Enemy/3 Final Enemy/Attack/1.png',
        '/assets/2.Enemy/3 Final Enemy/Attack/2.png',
        '/assets/2.Enemy/3 Final Enemy/Attack/3.png',
        '/assets/2.Enemy/3 Final Enemy/Attack/4.png',
        '/assets/2.Enemy/3 Final Enemy/Attack/5.png',
        '/assets/2.Enemy/3 Final Enemy/Attack/6.png'
    ];

    IMAGES_BOSS_HURT = [
        '/assets/2.Enemy/3 Final Enemy/Hurt/1.png',
        '/assets/2.Enemy/3 Final Enemy/Hurt/2.png',
        '/assets/2.Enemy/3 Final Enemy/Hurt/3.png',
        '/assets/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];

    IMAGES_BOSS_DEAD = [
        '/assets/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        '/assets/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        '/assets/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        '/assets/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        '/assets/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ]

    /**
     * Creates a new Endboss instance and starts its animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_BOSS_FLOAT[0]);
        this.loadImages(this.IMAGES_BOSS_FLOAT);
        this.loadImages(this.IMAGES_BOSS_INTRO);
        this.loadImages(this.IMAGES_BOSS_ATTACK);
        this.loadImages(this.IMAGES_BOSS_HURT);
        this.loadImages(this.IMAGES_BOSS_DEAD);
        this.x = 3800;
        this.animate();
    }

    /**
     * Starts all animation and movement intervals for the Endboss.
     * Plays the intro animation once on first contact, then alternates between
     * floating and attacking every 2600ms. During an attack the boss moves
     * 200px toward the character and smoothly returns to its start position afterward.
     * Stores all interval IDs for later cleanup.
     */
    animate() {
        let isAttacking = false;
        let introFinished = false;
        let startX = this.x;
        let frameCounter = 0;
        let deadFrame = 0;

        let bossAttackTriggerId = setInterval(() => {
            if (this.firstContact && introFinished) {
                isAttacking = true;

                let attackId = setInterval(() => {
                    if (this.x > startX - 200) {
                        this.x -= 5;
                    } else {
                        clearInterval(attackId);
                    }
                }, 1000 / 30);

                setTimeout(() => {
                    isAttacking = false;
                    clearInterval(attackId);

                    let returnId = setInterval(() => {
                        if (this.x < startX) {
                            this.x += 5;
                        } else {
                            clearInterval(returnId);
                        }
                    }, 1000 / 30);
                }, 6 * 100);
            }
        }, 1600);
        intervalIds.push(bossAttackTriggerId);

        let bossAnimateId = setInterval(() => {
            frameCounter++;

            if (this.isDead()) {
                if (frameCounter % 2 === 0) {
                    if (deadFrame < this.IMAGES_BOSS_DEAD.length) {
                        this.img = this.ImageCache[this.IMAGES_BOSS_DEAD[deadFrame]];
                        deadFrame++;
                    } else {
                        this.img = this.ImageCache[this.IMAGES_BOSS_DEAD[this.IMAGES_BOSS_DEAD.length - 1]];
                    }
                }
            } else if (this.bossIsHurt()) {
                if (frameCounter % 1 === 0)
                    this.playAnimation(this.IMAGES_BOSS_HURT);

            } else if (!this.firstContact) {
                if (frameCounter % 2 === 0)
                    this.playAnimation(this.IMAGES_BOSS_FLOAT);

            } else if (this.firstContact && this.currentImage < this.IMAGES_BOSS_INTRO.length) {
                if (frameCounter % 2 === 0)
                    this.playAnimation(this.IMAGES_BOSS_INTRO);

            } else if (isAttacking) {
                introFinished = true;
                if (frameCounter % 2 === 0)
                    this.playAnimation(this.IMAGES_BOSS_ATTACK);

            } else {
                introFinished = true;
                if (frameCounter % 2 === 0)
                    this.playAnimation(this.IMAGES_BOSS_FLOAT);
            }
        }, 100);
        intervalIds.push(bossAnimateId);

        let bossContactId = setInterval(() => {
            if (world && world.character.x > 3050 && !this.firstContact) {
                this.firstContact = true;
                this.currentImage = 0;
                startX = this.x;
            }
        }, 200);
        intervalIds.push(bossContactId);
    }
}