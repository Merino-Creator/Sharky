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
    energy = 500;
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

    /**
     * Creates a new Endboss instance and starts its animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_BOSS_FLOAT[0]);
        this.loadImages(this.IMAGES_BOSS_FLOAT);
        this.loadImages(this.IMAGES_BOSS_INTRO);
        this.loadImages(this.IMAGES_BOSS_ATTACK);
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
        let startX = this.x;

        let bossAttackTriggerId = setInterval(() => {
            if (this.firstContact) {
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
        }, 2600);
        intervalIds.push(bossAttackTriggerId);

        let bossAnimateId = setInterval(() => {
            if (!this.firstContact) {
                this.playAnimation(this.IMAGES_BOSS_FLOAT);
            } else if (this.firstContact && this.currentImage < this.IMAGES_BOSS_INTRO.length) {
                this.playAnimation(this.IMAGES_BOSS_INTRO);
            } else if (isAttacking) {
                this.playAnimation(this.IMAGES_BOSS_ATTACK);
            } else {
                this.playAnimation(this.IMAGES_BOSS_FLOAT);
            }
        }, 200);
        intervalIds.push(bossAnimateId);

        let bossContactId = setInterval(() => {
            if (world && world.character.x > 3000 && !this.firstContact) {
                this.firstContact = true;
                this.currentImage = 0;
                startX = this.x;
            }
        }, 200);
        intervalIds.push(bossContactId);
    }
}