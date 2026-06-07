/**
 * Represents the final boss enemy (Toxic Whale).
 * Plays an intro animation when the character gets close enough.
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

    IMAGES_ENDBOSS = [
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

    IMAGES_INTRO = [
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

    /**
     * Creates a new Endboss instance and starts its animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_ENDBOSS[0]);
        this.loadImages(this.IMAGES_ENDBOSS);
        this.loadImages(this.IMAGES_INTRO);
        this.x = 3800;
        this.animate();
    }

    /**
     * Starts the animation and first contact detection intervals for the Endboss.
     * Plays the intro animation once when the character reaches x > 3000,
     * then switches to the floating animation.
     * Stores all interval IDs for later cleanup.
     */
    animate() {
        let bossAnimateId = setInterval(() => {
            if (!this.firstContact) {
                this.playAnimation(this.IMAGES_ENDBOSS);
            } else if (this.firstContact && this.currentImage < this.IMAGES_INTRO.length) {
                this.playAnimation(this.IMAGES_INTRO);
            } else {
                this.playAnimation(this.IMAGES_ENDBOSS);
            }
        }, 250);
        intervalIds.push(bossAnimateId);

        let bossContactId = setInterval(() => {
            if (world && world.character.x > 3000 && !this.firstContact) {
                this.firstContact = true;
                this.currentImage = 0;
            }
        }, 250);
        intervalIds.push(bossContactId);
    }
}