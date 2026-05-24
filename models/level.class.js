class Level {
    enemies;
    lights;
    backgroundObjects;
    level_end_x = 720*4;

    constructor(enemies, lights, backgroundObjects) {
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
    }
}