let level1;

/**
 * Initializes level 1 by creating all game objects and passing them to the Level constructor.
 * Must be called before creating the World instance.
 */
function initLevel() {
    level1 = new Level(

        [
            new Puffer(),
            new Puffer(),
            new Puffer(),
            new Puffer(),
            new Puffer(),
            new Puffer(),
            new Puffer(),
            new Puffer(),
            new Puffer(),
            new Puffer(),
            new Jellyfish(),
            new Jellyfish(),
            new Jellyfish(),
            new Jellyfish(),
            new Jellyfish(),
            new Jellyfish(),
            new Jellyfish(),
            new Jellyfish(),
            new Jellyfish(),
            new Jellyfish(),
            new Endboss()
        ],

        [
            new Light('./assets/3. Background/Layers/1. Light/1.png'),
            new Light('./assets/3. Background/Layers/1. Light/2.png', 520)
        ],

        [
            new BackgroundObject('./assets/3. Background/Layers/5. Water/D2.png', -720),
            new BackgroundObject('./assets/3. Background/Layers/3.Fondo 1/D2.png', -720),
            new BackgroundObject('./assets/3. Background/Layers/4.Fondo 2/D2.png', -720),
            new BackgroundObject('./assets/3. Background/Layers/2. Floor/D2.png', -720),
            new BackgroundObject('./assets/3. Background/Layers/5. Water/D1.png', 0),
            new BackgroundObject('./assets/3. Background/Layers/3.Fondo 1/D1.png', 0),
            new BackgroundObject('./assets/3. Background/Layers/4.Fondo 2/D1.png', 0),
            new BackgroundObject('./assets/3. Background/Layers/2. Floor/D1.png', 0),
            new BackgroundObject('./assets/3. Background/Layers/5. Water/D2.png', 720),
            new BackgroundObject('./assets/3. Background/Layers/3.Fondo 1/D2.png', 720),
            new BackgroundObject('./assets/3. Background/Layers/4.Fondo 2/D2.png', 720),
            new BackgroundObject('./assets/3. Background/Layers/2. Floor/D2.png', 720),
            new BackgroundObject('./assets/3. Background/Layers/5. Water/D1.png', 720 * 2),
            new BackgroundObject('./assets/3. Background/Layers/3.Fondo 1/D1.png', 720 * 2),
            new BackgroundObject('./assets/3. Background/Layers/4.Fondo 2/D1.png', 720 * 2),
            new BackgroundObject('./assets/3. Background/Layers/2. Floor/D1.png', 720 * 2),
            new BackgroundObject('./assets/3. Background/Layers/5. Water/D2.png', 720 * 3),
            new BackgroundObject('./assets/3. Background/Layers/3.Fondo 1/D2.png', 720 * 3),
            new BackgroundObject('./assets/3. Background/Layers/4.Fondo 2/D2.png', 720 * 3),
            new BackgroundObject('./assets/3. Background/Layers/2. Floor/D2.png', 720 * 3),
            new BackgroundObject('./assets/3. Background/Layers/5. Water/D1.png', 720 * 4),
            new BackgroundObject('./assets/3. Background/Layers/3.Fondo 1/D1.png', 720 * 4),
            new BackgroundObject('./assets/3. Background/Layers/4.Fondo 2/D1.png', 720 * 4),
            new BackgroundObject('./assets/3. Background/Layers/2. Floor/D1.png', 720 * 4),
            new BackgroundObject('./assets/3. Background/Layers/5. Water/D2.png', 720 * 5),
            new BackgroundObject('./assets/3. Background/Layers/3.Fondo 1/D2.png', 720 * 5),
            new BackgroundObject('./assets/3. Background/Layers/4.Fondo 2/D2.png', 720 * 5),
            new BackgroundObject('./assets/3. Background/Layers/2. Floor/D2.png', 720 * 5),
            new BackgroundObject('./assets/3. Background/Layers/5. Water/D1.png', 720 * 6),
            new BackgroundObject('./assets/3. Background/Layers/3.Fondo 1/D1.png', 720 * 6),
            new BackgroundObject('./assets/3. Background/Layers/4.Fondo 2/D1.png', 720 * 6),
            new BackgroundObject('./assets/3. Background/Layers/2. Floor/D1.png', 720 * 6)
        ],

        [
            new Statusbar('health'),
            new Statusbar('toxic'),
            new Statusbar('coin')
        ],

        [],

        [
            new Coins(), new Coins(), new Coins(), new Coins(), new Coins(),
            new Coins(), new Coins(), new Coins(), new Coins(), new Coins(),
            new Coins(), new Coins(), new Coins(), new Coins(), new Coins(),
            new Coins(), new Coins(), new Coins(), new Coins(), new Coins()
        ]
    );
}