class Statusbar extends DrawableObject {

    width = 200;
    height = 60;
    energyAmount = 100;
    coinAmount = 0;
    toxicAmount = 0;
    type;

    POSITIONS = {
        health: { x: 20, y: 0 },
        toxic: { x: 220, y: 0 },
        coin: { x: 420, y: 0 }
    };

    /**
     * Creates a new Statusbar instance of the given type and fetches the images.
     * @param {string} type - The type of statusbar ('health', 'coin' or 'toxic').
     */
    constructor(type) {
        super();
        this.type = type;
        this.x = this.POSITIONS[type].x;
        this.y = this.POSITIONS[type].y;
        this.fetchStatusbarImages();
    }

    /**
     * Fetches all statusbar images from the JSON file and loads them into the ImageCache.
     */
    async fetchStatusbarImages() {
        let response = await fetch('./jsons/statusbar-images.json');
        let images = await response.json();

        this.IMAGES_HEALTH = images.health;
        this.IMAGES_COIN = images.coin;
        this.IMAGES_TOXIC = images.toxic;

        this.loadImages(this.IMAGES_HEALTH);
        this.loadImages(this.IMAGES_COIN);
        this.loadImages(this.IMAGES_TOXIC);

        if (this.type === 'health') {
            this.setPercentage(100);
        } else {
            this.setPercentage(0);
        }
    }

    /**
     * Sets the percentage and updates the displayed image accordingly.
     * @param {number} percentage - The percentage value between 0 and 100.
     */
    setPercentage(energyAmount) {
        this.energyAmount = energyAmount;
        let images = this.getImages();
        let path = images[this.resolveImageIndex()];
        this.img = this.ImageCache[path];
    }

    /**
     * Returns the correct image array based on the statusbar type.
     * @returns {string[]} The image array for the current type.
     */
    getImages() {
        if (this.type === 'health') return this.IMAGES_HEALTH;
        if (this.type === 'coin') return this.IMAGES_COIN;
        if (this.type === 'toxic') return this.IMAGES_TOXIC;
    }

    /**
     * Resolves the correct image index based on the current percentage.
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex() {
        if (this.type === 'health') {
            return this.resolveHealthIndex();
        } else if (this.type === 'toxic') {
            return this.resolveToxicIndex();
        } else if (this.type === 'coin') {
            return this.resolveCoinIndex();
        }
    }

    /**
     * Resolves the image index for the health bar based on energy (0-100).
     * @returns {number} The index of the image to display.
     */
    resolveHealthIndex() {
        if (this.energyAmount == 100) return 5;
        else if (this.energyAmount > 80) return 4;
        else if (this.energyAmount > 60) return 3;
        else if (this.energyAmount > 40) return 2;
        else if (this.energyAmount > 20) return 1;
        else return 0;
    }

    /**
     * Resolves the image index for the toxic bar based on bottle count (0-5).
     * @returns {number} The index of the image to display.
     */
    resolveToxicIndex() {
        if (this.energyAmount >= 5) return 5;
        else if (this.energyAmount >= 4) return 4;
        else if (this.energyAmount >= 3) return 3;
        else if (this.energyAmount >= 2) return 2;
        else if (this.energyAmount >= 1) return 1;
        else return 0;
    }

    /**
     * Resolves the image index for the coin bar based on coin count (0-20).
     * @returns {number} The index of the image to display.
     */
    resolveCoinIndex() {
        if (this.energyAmount >= 20) return 5;
        else if (this.energyAmount >= 16) return 4;
        else if (this.energyAmount >= 12) return 3;
        else if (this.energyAmount >= 8) return 2;
        else if (this.energyAmount >= 4) return 1;
        else return 0;
    }
}