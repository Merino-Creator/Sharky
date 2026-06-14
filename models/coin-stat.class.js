/**
 * Represents the coin amount statusbar icon displayed in the UI.
 * Shows the current number of collected coins next to the icon.
 * @extends Statusbar
 */
class CoinAmount extends Statusbar {
    x = 235;
    y = 28;
    height = 60;
    width = 60;

    /**
     * Creates a new CoinAmount instance and loads the coin icon image.
     */
    constructor() {
        super().loadImage('./assets/4. Marcadores/green/100_ copia 6.png');
    }
}