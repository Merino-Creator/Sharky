class Level {
    enemies;
    lights;
    backgroundObjects;
    UI;
    toxic;
    coins;

    level_end_x = 500*4;


    constructor(enemies, lights, backgroundObjects, UI, toxic, coins) {
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
        this.UI = UI;
        this.toxic = toxic;
        this.coins = coins;
    }
}