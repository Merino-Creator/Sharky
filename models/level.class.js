class Level {
    enemies;
    lights;
    backgroundObjects;
    level_end_x = 500*4;
    UI;
    toxic;
    coin;


    constructor(enemies, lights, backgroundObjects, UI, toxic, coin) {
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
        this.UI = UI;
        this.toxic = toxic;
        this.coin = coin;
    }
}