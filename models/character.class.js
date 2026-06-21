/**
 * Represents the player character Sharky.
 * Handles movement, animation states and attack actions.
 * @extends MoveableObject
 */
class Character extends MoveableObject {

    x = 20;
    y = 100;
    height = 260;
    width = 220;
    speed = 10;
    world;
    lastKeyPress = new Date().getTime();
    energy = 100;

    HURT_AUDIO = new Audio('./assets/8.Audio/character-hurt.mp3');
    BUBBLE_SHOOT_AUDIO = new Audio('./assets/8.Audio/bubble-shoot.mp3');
    SNORING_AUDIO = new Audio('./assets/8.Audio/snoring.mp3');
    DIES_AUDIO = new Audio('./assets/8.Audio/character-dies.mp3');

    offset = {
        top: 110,
        bottom: 60,
        left: 40,
        right: 40
    };

    /**
     * Creates a new Character instance, loads the default image and fetches animation images.
     */
    constructor() {
        super().loadImage('./assets/1.Sharkie/3.Swim/1.png');
        registerAudio(this.HURT_AUDIO);
        registerAudio(this.BUBBLE_SHOOT_AUDIO);
        registerAudio(this.SNORING_AUDIO);
        registerAudio(this.DIES_AUDIO);
        this.fetchCharacterImages();
    }

    /**
     * Fetches all character animation image paths from the JSON file,
     * assigns them to the corresponding image arrays and starts the animation.
     */
    async fetchCharacterImages() {
        let response = await fetch('./jsons/character-images.json');
        let images = await response.json();

        this.IMAGES_SWIM = images.swim;
        this.IMAGES_IDLE = images.idle;
        this.IMAGES_LONG_IDLE = images.longIdle;
        this.IMAGES_DEAD = images.dead;
        this.IMAGES_HURT = images.hurt;
        this.IMAGES_BUBBLE_ATTACK = images.bubbleAttack;
        this.IMAGES_SLAP_ATTACK = images.slapAttack;

        this.loadCharacterImages();
        this.animate();
    }

    /**
     * Preloads all character animation images into the ImageCache.
     */
    loadCharacterImages() {
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_BUBBLE_ATTACK);
        this.loadImages(this.IMAGES_SLAP_ATTACK);
    }

    /**
     * Starts the movement and animation intervals for the character.
     * Stores all interval IDs for later cleanup.
     */
    animate() {
        let frameCounter = 0;

        let characterMoveId = setInterval(() => this.moveCharacter(), 1000 / 30);
        intervalIds.push(characterMoveId);

        let characterAnimateId = setInterval(() => {
            frameCounter++;
            this.animateCharacter(frameCounter);
        }, 100);
        intervalIds.push(characterAnimateId);
    }

    /**
     * Determines and plays the correct animation based on the current character state.
     * Priority order: dead > hurt > slap attack > bubble attack > swimming > long idle > idle.
     * Returns early when paused, stopping all movement sounds.
     * @param {number} frameCounter - The current animation frame counter.
     */
    animateCharacter(frameCounter) {
        if (gamePaused) {
            this.SNORING_AUDIO.pause();
            this.snoringPlaying = false;
            return;
        }

        if (this.isDead()) return this.playDeadAnimation(frameCounter);
        if (this.isHurt()) return this.playHurtAnimation(frameCounter);
        if (this.isSlapAttacking) return this.playSlapAnimation(frameCounter);
        if (this.isAttacking) return this.playBubbleAnimation(frameCounter);
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) return this.playSwimAnimation(frameCounter);
        if (this.isLongIdle()) return this.playLongIdleAnimation(frameCounter);
        this.playIdleAnimation(frameCounter);
    }

    /**
     * Plays the death animation and the death sound.
     * @param {number} frameCounter - The current animation frame counter.
     */
    playDeadAnimation(frameCounter) {
        if (frameCounter % 2 === 0)
            this.playAnimation(this.IMAGES_DEAD);
        this.DIES_AUDIO.play();
    }

    /**
     * Plays the hurt animation and the hurt sound once per hit.
     * @param {number} frameCounter - The current animation frame counter.
     */
    playHurtAnimation(frameCounter) {
        if (frameCounter % 1 === 0)
            this.playAnimation(this.IMAGES_HURT);
        if (!this.hurtSoundPlaying) {
            this.hurtSoundPlaying = true;
            this.HURT_AUDIO.play();
            setTimeout(() => this.hurtSoundPlaying = false, 1000);
        }
    }

    /**
     * Plays the slap attack animation.
     * @param {number} frameCounter - The current animation frame counter.
     */
    playSlapAnimation(frameCounter) {
        if (frameCounter % 1 === 0)
            this.playAnimation(this.IMAGES_SLAP_ATTACK);
    }

    /**
     * Plays the bubble attack animation.
     * @param {number} frameCounter - The current animation frame counter.
     */
    playBubbleAnimation(frameCounter) {
        if (frameCounter % 1 === 0)
            this.playAnimation(this.IMAGES_BUBBLE_ATTACK);
    }

    /**
     * Plays the swim animation and stops the snoring sound.
     * @param {number} frameCounter - The current animation frame counter.
     */
    playSwimAnimation(frameCounter) {
        if (frameCounter % 2 === 0)
            this.playAnimation(this.IMAGES_SWIM);
        this.SNORING_AUDIO.pause();
        this.SNORING_AUDIO.currentTime = 0;
        this.snoringPlaying = false;
    }

    /**
     * Plays the long idle animation and starts the snoring sound once.
     * @param {number} frameCounter - The current animation frame counter.
     */
    playLongIdleAnimation(frameCounter) {
        if (frameCounter % 2 === 0)
            this.playAnimation(this.IMAGES_LONG_IDLE);
        if (!this.snoringPlaying) {
            this.snoringPlaying = true;
            this.SNORING_AUDIO.play();
        }
    }

    /**
     * Plays the idle animation and stops the snoring sound.
     * @param {number} frameCounter - The current animation frame counter.
     */
    playIdleAnimation(frameCounter) {
        if (frameCounter % 2 === 0)
            this.playAnimation(this.IMAGES_IDLE);
        this.SNORING_AUDIO.pause();
        this.SNORING_AUDIO.currentTime = 0;
        this.snoringPlaying = false;
    }

    /**
     * Handles all character movement and action inputs each frame.
     * Updates the camera position based on the character's x position.
     */
    moveCharacter() {
        if (this.canMoveRight()) this.moveRight();
        if (this.canMoveLeft()) this.moveLeft();
        if (this.canMoveUp()) this.moveUp();
        if (this.canMoveDown()) this.moveDown();
        if (this.canShootBubble()) this.shootBubble();
        if (this.canSlap()) this.slap();
        this.world.camera_x = -this.x + 40;
    }

    /**
     * Checks if the character can move right.
     * @returns {boolean} True if the right key is pressed and the character hasn't reached the level end.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Moves the character to the right and updates direction and last key press time.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.lastKeyPress = new Date().getTime();
    }

    /**
     * Checks if the character can move left.
     * @returns {boolean} True if the left key is pressed and the character hasn't reached the left boundary.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Moves the character to the left and updates direction and last key press time.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.lastKeyPress = new Date().getTime();
    }

    /**
     * Checks if the character can move up.
     * @returns {boolean} True if the up key is pressed and the character hasn't reached the upper boundary.
     */
    canMoveUp() {
        return this.world.keyboard.UP && this.y > -120;
    }

    /**
     * Moves the character upward and updates the last key press time.
     */
    moveUp() {
        super.moveUP();
        this.lastKeyPress = new Date().getTime();
    }

    /**
     * Checks if the character can move down.
     * @returns {boolean} True if the down key is pressed and the character hasn't reached the lower boundary.
     */
    canMoveDown() {
        return this.world.keyboard.DOWN && this.y < 280;
    }

    /**
     * Moves the character downward and updates the last key press time.
     */
    moveDown() {
        super.moveDown();
        this.lastKeyPress = new Date().getTime();
    }

    /**
     * Checks if the character can shoot a bubble.
     * @returns {boolean} True if the S key is pressed.
     */
    canShootBubble() {
        return this.world.keyboard.S;
    }

    /**
     * Triggers the bubble attack, updates the last key press time
     * and plays the shoot sound after the animation delay.
     */
    shootBubble() {
        super.shootBubble(this.world);
        this.lastKeyPress = new Date().getTime();
        setTimeout(() => {
            if (!this.otherDirection && !this.isHurt()) {
                this.BUBBLE_SHOOT_AUDIO.play();
            }
        }, 750);
    }

    /**
     * Checks if the character can perform a slap attack.
     * @returns {boolean} True if the D key is pressed.
     */
    canSlap() {
        return this.world.keyboard.D;
    }

    /**
     * Triggers the slap attack and updates the last key press time.
     */
    slap() {
        super.slap(this.world);
        this.lastKeyPress = new Date().getTime();
    }

    /**
     * Checks if the character has been idle for more than 10 seconds.
     * @returns {boolean} True if no key has been pressed for over 10 seconds.
     */
    isLongIdle() {
        let timePassed = new Date().getTime() - this.lastKeyPress;
        return timePassed > 10000;
    }

    /**
     * Checks if the death animation has finished playing.
     * @returns {boolean} True if more than 1800ms have passed since the character died.
     */
    deathAnimationFinished() {
        let timePassed = new Date().getTime() - this.timeDied;
        return timePassed > 1800;
    }
}