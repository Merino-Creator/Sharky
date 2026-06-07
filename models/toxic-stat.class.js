/**
 * Represents the toxic amount statusbar icon displayed in the UI.
 * Shows the current number of collected poison bottles next to the icon.
 * @extends Statusbar
 */
class Toxic extends Statusbar {
    x = 0;
    y = 0;
    height = 90;
    width = 90;

    /**
     * Creates a new Toxic instance and loads the toxic icon image.
     */
    constructor() {
        super().loadImage('assets/4. Marcadores/green/100_ copia 5.png');
    }
}