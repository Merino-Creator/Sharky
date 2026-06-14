/**
 * Represents the health statusbar icon displayed in the UI.
 * Shows the current character energy value next to the icon.
 * @extends Statusbar
 */
class Health extends Statusbar {
    x = 100;
    y = 15;
    height = 70;
    width = 70;

    /**
     * Creates a new Health instance and loads the health icon image.
     */
    constructor() {
        super().loadImage('./assets/4. Marcadores/green/100_  copia 3.png');
    }
}