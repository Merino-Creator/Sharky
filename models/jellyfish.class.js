/**
 * Represents a Jellyfish enemy that moves up and down within defined boundaries.
 * Becomes aggressive when reduced to 25 energy, increasing its damage output.
 * @extends MoveableObject
 */
class Jellyfish extends MoveableObject {

    static usedPositions = [];
    energy = 50;
    damage = 19;

    JELLY_AGRESSIVE_AUDIO = new Audio('./assets/8.Audio/jellyfish-agressive.mp3');
    JELLY_DEAD_AUDIO = new Audio('./assets/8.Audio/jellyfish-dead.mp3');

    /**
     * Creates a new Jellyfish instance with a random position in either
     * the top zone (0-160) or bottom zone (300-400) of the canvas.
     */
    constructor() {
        super().loadImage('./assets/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.x = this.generateX();
        this.checkYPosition();
        this.speed = 1 + Math.random() * 0.25;
        this.fetchJellyfishImages();
    }

    /**
     * Fetches all jellyfish animation image paths from the JSON file,
     * assigns them to the corresponding image arrays and starts the animation.
     */
    async fetchJellyfishImages() {
        let response = await fetch('./jsons/jellyfish-images.json');
        let images = await response.json();

        this.IMAGES_JELLY = images.swim;
        this.IMAGES_JELLY_DEAD = images.dead;
        this.IMAGES_JELLY_AGRESSIVE = images.agressive;

        this.loadJellyfishImages();
        this.animate();
    }

    /**
     * Preloads all jellyfish animation images into the ImageCache.
     */
    loadJellyfishImages() {
        this.loadImages(this.IMAGES_JELLY);
        this.loadImages(this.IMAGES_JELLY_DEAD);
        this.loadImages(this.IMAGES_JELLY_AGRESSIVE);
    }

    /**
     * Sets the y position and movement boundaries for the Jellyfish
     * randomly in either the top zone or bottom zone of the canvas.
     */
    checkYPosition() {
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
    }

    /**
     * Generates a random x position that maintains a minimum distance
     * of 400px from all other Jellyfish positions.
     * @returns {number} A valid x position for the Jellyfish.
     */
    generateX() {
        let x;
        let tooClose;

        do {
            x = 400 + Math.random() * 3300;
            tooClose = Jellyfish.usedPositions.some(pos => Math.abs(pos - x) < 400);
        } while (tooClose);

        Jellyfish.usedPositions.push(x);
        return x;
    }

    /**
     * Starts the animation and movement intervals for the Jellyfish.
     * Stores all interval IDs for later cleanup.
     */
    animate() {
        this.agressiveSoundPlaying = false;
        this.deadSoundPlaying = false;

        let jellyAnimateId = setInterval(() => {
            this.checkAnimation();
        }, 250);

        intervalIds.push(jellyAnimateId);
        this.moveUpDown();
    }

    /**
     * Determines and plays the correct animation based on the current Jellyfish state.
     * Priority order: dead > aggressive > swim.
     */
    checkAnimation() {
        if (gamePaused) return;
        if (this.isDead()) {
            this.playDeadAnimation();
        } else if (this.energy == 25) {
            this.playAgressiveAnimation();
        } else {
            this.playSwimAnimation();
        }
    }

    /**
     * Plays the dead animation and the death sound once.
     */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_JELLY_DEAD);
        if (!this.deadSoundPlaying) {
            this.deadSoundPlaying = true;
            this.JELLY_DEAD_AUDIO.play();
            registerAudio(this.JELLY_DEAD_AUDIO);
            setTimeout(() => {
                this.JELLY_DEAD_AUDIO.pause();
                this.JELLY_DEAD_AUDIO.currentTime = 0;
            }, 1000);
        }
    }

    /**
     * Plays the aggressive animation, activates aggressive mode and plays the aggressive sound once.
     */
    playAgressiveAnimation() {
        this.playAnimation(this.IMAGES_JELLY_AGRESSIVE);
        this.agressiveMode();
        if (!this.agressiveSoundPlaying) {
            this.agressiveSoundPlaying = true;
            this.JELLY_AGRESSIVE_AUDIO.play();
            registerAudio(this.JELLY_AGRESSIVE_AUDIO);
            setTimeout(() => {
                this.JELLY_AGRESSIVE_AUDIO.pause();
                this.JELLY_AGRESSIVE_AUDIO.currentTime = 0;
            }, 1000);
        }
    }

    /**
     * Plays the standard swim animation.
     */
    playSwimAnimation() {
        this.playAnimation(this.IMAGES_JELLY);
    }

    /**
     * Sets the Jellyfish to aggressive mode by doubling its damage value.
     * @returns {number} The new damage value in aggressive mode.
     */
    agressiveMode() {
        return this.damage = 38;
    }
}