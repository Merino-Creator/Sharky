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
    isAttacking = false;
    introFinished = false;
    startX = 3800;
    frameCounter = 0;
    deadFrame = 0;

    BOSS_ATTACK_AUDIO = new Audio('./assets/8.Audio/boss-attack.mp3');
    BOSS_DIES_AUDIO = new Audio('./assets/8.Audio/boss-dies.mp3');

    offset = {
        top: 130,
        bottom: 60,
        left: 30,
        right: 40
    };

    /**
     * Creates a new Endboss instance, sets the starting position and fetches animation images.
     */
    constructor() {
        super().loadImage('./assets/2.Enemy/3 Final Enemy/2.floating/1.png');
        this.x = 3800;
        this.fetchEndbossImages();
    }

    /**
     * Fetches all endboss animation image paths from the JSON file,
     * assigns them to the corresponding image arrays and starts the animation.
     */
    async fetchEndbossImages() {
        let response = await fetch('./jsons/endboss-images.json');
        let images = await response.json();

        this.IMAGES_BOSS_FLOAT = images.float;
        this.IMAGES_BOSS_INTRO = images.intro;
        this.IMAGES_BOSS_ATTACK = images.attack;
        this.IMAGES_BOSS_HURT = images.hurt;
        this.IMAGES_BOSS_DEAD = images.dead;

        this.loadEndbossImages();
        this.animate();
    }

    /**
     * Preloads all endboss animation images into the ImageCache.
     */
    loadEndbossImages() {
        this.loadImages(this.IMAGES_BOSS_FLOAT);
        this.loadImages(this.IMAGES_BOSS_INTRO);
        this.loadImages(this.IMAGES_BOSS_ATTACK);
        this.loadImages(this.IMAGES_BOSS_HURT);
        this.loadImages(this.IMAGES_BOSS_DEAD);
    }

    /**
    * Starts all animation and movement intervals for the Endboss.
    * Stores all interval IDs for later cleanup.
    */
    animate() {
        let bossAttackTriggerId = setInterval(() => {
            this.triggerAttack();
        }, 1600);
        intervalIds.push(bossAttackTriggerId);

        let bossAnimateId = setInterval(() => {
            this.checkAnimation();
        }, 100);
        intervalIds.push(bossAnimateId);

        let bossContactId = setInterval(() => {
            this.checkFirstContact();
        }, 200);
        intervalIds.push(bossContactId);
    }

    /**
     * Checks if the character has reached the boss trigger zone for the first time.
     * Sets firstContact to true and stores the boss start position when triggered.
     */
    checkFirstContact() {
        if (gamePaused) return;
        if (world && world.character.x > 3050 && !this.firstContact) {
            this.firstContact = true;
            this.currentImage = 0;
            this.startX = this.x;
        }
    }

    /**
     * Determines and plays the correct animation based on the current Endboss state.
     * Returns early when the game is paused.
     * Priority order: dead > hurt > attacking > intro > float.
     */
    checkAnimation() {
        if (gamePaused) return;
        this.frameCounter++;

        if (this.isDead()) {
            this.playDeadAnimation();
        } else if (this.bossIsHurt()) {
            this.playHurtAnimation();
        } else if (this.isAttacking) {
            this.playAttackAnimation();
        } else if (this.firstContact && this.currentImage < this.IMAGES_BOSS_INTRO.length) {
            this.playIntroAnimation();
        } else {
            if (this.firstContact) this.introFinished = true;
            this.playFloatAnimation();
        }
    }

    /**
     * Triggers the attack sequence if first contact has been made and intro is finished.
     * Moves the boss toward the character and returns to start position afterward.
     */
    triggerAttack() {
        if (gamePaused) return;
        if (this.firstContact && this.introFinished) {
            this.isAttacking = true;
            this.BOSS_ATTACK_AUDIO.play();
            registerAudio(this.BOSS_ATTACK_AUDIO);

            let attackId = setInterval(() => {
                if (gamePaused) return;
                this.x -= 3;
            }, 1000 / 30);

            setTimeout(() => {
                this.attackAnimationXPosition(attackId);
            }, 6 * 100);
        }
    }

    /**
     * Stops the attack movement and smoothly returns the boss to its start position.
     * @param {number} attackId - The interval ID of the attack movement to clear.
     */
    attackAnimationXPosition(attackId) {
        this.isAttacking = false;
        clearInterval(attackId);

        let returnId = setInterval(() => {
            if (gamePaused) return;
            if (this.x < this.startX) {
                this.x += 3;
            } else {
                clearInterval(returnId);
            }
        }, 1000 / 30);
    }

    /**
     * Plays the dead animation and triggers the death sound once.
     */
    playDeadAnimation() {
        if (this.frameCounter % 2 === 0) {
            if (this.deadFrame < this.IMAGES_BOSS_DEAD.length) {
                this.img = this.ImageCache[this.IMAGES_BOSS_DEAD[this.deadFrame]];
                this.deadFrame++;
                if (this.deadFrame === 1) {
                    setTimeout(() => {
                        this.BOSS_DIES_AUDIO.play();
                        setTimeout(() => {
                            this.BOSS_DIES_AUDIO.pause();
                            this.BOSS_DIES_AUDIO.currentTime = 0;
                        }, 1000);
                    }, 100);
                }
            } else {
                this.img = this.ImageCache[this.IMAGES_BOSS_DEAD[this.IMAGES_BOSS_DEAD.length - 1]];
            }
        }
    }

    /**
     * Plays the hurt animation.
     */
    playHurtAnimation() {
        if (this.frameCounter % 1 === 0)
            this.playAnimation(this.IMAGES_BOSS_HURT);
    }

    /**
     * Plays the float animation before first contact.
     */
    playFloatAnimation() {
        if (this.frameCounter % 2 === 0)
            this.playAnimation(this.IMAGES_BOSS_FLOAT);
    }

    /**
     * Plays the intro animation once on first contact.
     */
    playIntroAnimation() {
        if (this.frameCounter % 2 === 0)
            this.playAnimation(this.IMAGES_BOSS_INTRO);
    }

    /**
     * Plays the attack animation and marks the intro as finished.
     */
    playAttackAnimation() {
        this.introFinished = true;
        if (this.frameCounter % 2 === 0)
            this.playAnimation(this.IMAGES_BOSS_ATTACK);
    }
}