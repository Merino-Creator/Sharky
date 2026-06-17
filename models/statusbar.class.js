class Statusbar extends DrawableObject {

    width = 200;
    height = 60;
    percentage = 100;
    type;

    POSITIONS = {
        health: { x: 20, y: 0 },
        toxic:  { x: 20, y: 50 },
        coin:   { x: 20, y: 100 }
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

        this.setPercentage(100);
    }

    /**
     * Sets the percentage and updates the displayed image accordingly.
     * @param {number} percentage - The percentage value between 0 and 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let images = this.getImages();
        if (!images) return;
        let path = images[this.resolveImageIndex()];
        if (!path) return;
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
        if (this.percentage == 100) return 5;
        else if (this.percentage > 80) return 4;
        else if (this.percentage > 60) return 3;
        else if (this.percentage > 40) return 2;
        else if (this.percentage > 20) return 1;
        else return 0;
    }
}