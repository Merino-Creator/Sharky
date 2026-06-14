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

    HURT_AUDIO = new Audio('assets/8.Audio/character-hurt.mp3');
    BUBBLE_SHOOT_AUDIO = new Audio('assets/8.Audio/bubble-shoot.mp3');
    SNORING_AUDIO = new Audio ('assets/8.Audio/snoring.mp3');

    offset = {
        top: 110,
        bottom: 60,
        left: 40,
        right: 40
    };

    IMAGES_SWIM = [
        './assets/1.Sharkie/3.Swim/1.png',
        './assets/1.Sharkie/3.Swim/2.png',
        './assets/1.Sharkie/3.Swim/3.png',
        './assets/1.Sharkie/3.Swim/4.png',
        './assets/1.Sharkie/3.Swim/5.png',
        './assets/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_IDLE = [
        'assets/1.Sharkie/1.IDLE/1.png',
        'assets/1.Sharkie/1.IDLE/2.png',
        'assets/1.Sharkie/1.IDLE/3.png',
        'assets/1.Sharkie/1.IDLE/4.png',
        'assets/1.Sharkie/1.IDLE/5.png',
        'assets/1.Sharkie/1.IDLE/6.png',
        'assets/1.Sharkie/1.IDLE/7.png',
        'assets/1.Sharkie/1.IDLE/8.png',
        'assets/1.Sharkie/1.IDLE/9.png',
        'assets/1.Sharkie/1.IDLE/10.png',
        'assets/1.Sharkie/1.IDLE/11.png',
        'assets/1.Sharkie/1.IDLE/12.png',
        'assets/1.Sharkie/1.IDLE/13.png',
        'assets/1.Sharkie/1.IDLE/14.png',
        'assets/1.Sharkie/1.IDLE/15.png',
        'assets/1.Sharkie/1.IDLE/16.png',
        'assets/1.Sharkie/1.IDLE/17.png',
        'assets/1.Sharkie/1.IDLE/18.png'
    ];

    IMAGES_LONG_IDLE = [
        'assets/1.Sharkie/2.Long_IDLE/i1.png',
        'assets/1.Sharkie/2.Long_IDLE/i2.png',
        'assets/1.Sharkie/2.Long_IDLE/i3.png',
        'assets/1.Sharkie/2.Long_IDLE/i4.png',
        'assets/1.Sharkie/2.Long_IDLE/i5.png',
        'assets/1.Sharkie/2.Long_IDLE/i6.png',
        'assets/1.Sharkie/2.Long_IDLE/i7.png',
        'assets/1.Sharkie/2.Long_IDLE/i8.png',
        'assets/1.Sharkie/2.Long_IDLE/i9.png',
        'assets/1.Sharkie/2.Long_IDLE/i10.png',
        'assets/1.Sharkie/2.Long_IDLE/i11.png',
        'assets/1.Sharkie/2.Long_IDLE/i12.png',
        'assets/1.Sharkie/2.Long_IDLE/i13.png',
        'assets/1.Sharkie/2.Long_IDLE/i14.png'
    ];

    IMAGES_DEAD = [
        'assets/1.Sharkie/6.dead/1.Poisoned/1.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/2.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/3.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/4.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/5.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/6.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/7.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/8.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/9.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/10.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/11.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];

    IMAGES_HURT = [
        'assets/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'assets/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'assets/1.Sharkie/5.Hurt/2.Electric shock/3.png',
    ];

    IMAGES_BUBBLE_ATTACK = [
        '/assets/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        '/assets/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        '/assets/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        '/assets/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        '/assets/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        '/assets/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        '/assets/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        '/assets/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
    ];

    IMAGES_SLAP_ATTACK = [
        '/assets/1.Sharkie/4.Attack/Fin slap/1.png',
        '/assets/1.Sharkie/4.Attack/Fin slap/2.png',
        '/assets/1.Sharkie/4.Attack/Fin slap/3.png',
        '/assets/1.Sharkie/4.Attack/Fin slap/4.png',
        '/assets/1.Sharkie/4.Attack/Fin slap/5.png',
        '/assets/1.Sharkie/4.Attack/Fin slap/6.png',
        '/assets/1.Sharkie/4.Attack/Fin slap/7.png',
        '/assets/1.Sharkie/4.Attack/Fin slap/8.png'
    ];

    /**
     * Creates a new Character instance and preloads all animation images.
     */
    constructor() {
        super().loadImage('./assets/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_BUBBLE_ATTACK);
        this.loadImages(this.IMAGES_SLAP_ATTACK);
        this.animate();
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
     * @param {number} frameCounter - The current animation frame counter.
     */
    animateCharacter(frameCounter) {
        if (this.isDead()) {
            if (frameCounter % 2 === 0)
                this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            if (frameCounter % 1 === 0)
                this.playAnimation(this.IMAGES_HURT);
            this.HURT_AUDIO.play();
            registerAudio(this.HURT_AUDIO);
        } else if (this.isSlapAttacking) {
            if (frameCounter % 1 === 0)
                this.playAnimation(this.IMAGES_SLAP_ATTACK);
        } else if (this.isAttacking) {
            if (frameCounter % 1 === 0)
                this.playAnimation(this.IMAGES_BUBBLE_ATTACK);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
            if (frameCounter % 2 === 0)
                this.playAnimation(this.IMAGES_SWIM);
        } else if (this.isLongIdle()) {
            if (frameCounter % 2 === 0)
                this.playAnimation(this.IMAGES_LONG_IDLE);
                this.SNORING_AUDIO.play();
        } else {
            if (frameCounter % 2 === 0)
                this.playAnimation(this.IMAGES_IDLE);
        }
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
     * Triggers the bubble attack and updates the last key press time.
     */
    shootBubble() {
        super.shootBubble(this.world);
        this.lastKeyPress = new Date().getTime();
        setTimeout(() => {
            if (!this.otherDirection) {
                this.BUBBLE_SHOOT_AUDIO.play();
                registerAudio(this.BUBBLE_SHOOT_AUDIO);
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