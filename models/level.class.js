class Level {
    enemies;
    lights;
    backgroundObjects;
    level_end_x = 500*4;
    UI;

    constructor(enemies, lights, backgroundObjects, UI) {
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
        this.UI = UI;
    }
}