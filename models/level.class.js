/**
 * Represents a game level containing all objects and settings for that level.
 */
class Level {
    enemies;
    lights;
    backgroundObjects;
    UI;
    toxic;
    coins;
    level_end_x = 500 * 8;

    /**
     * Creates a new Level instance.
     * @param {MoveableObject[]} enemies - Array of enemy objects in the level.
     * @param {Light[]} lights - Array of light effect objects in the level.
     * @param {BackgroundObject[]} backgroundObjects - Array of background layer objects.
     * @param {Statusbar[]} UI - Array of UI statusbar elements.
     * @param {PoisonBottle[]} toxic - Array of collectible poison bottle objects.
     * @param {Coins[]} coins - Array of collectible coin objects.
     */
    constructor(enemies, lights, backgroundObjects, UI, toxic, coins) {
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
        this.UI = UI;
        this.toxic = toxic || [];
        this.coins = coins;
    }
}