function introOverlayTemplate() {
    return `
        <button id="closeOverlayBtn" onclick="closeOverlay()">✕</button>
        <h2>So wird gespielt!</h2>
        <h3>Steuerung</h3><br>
        Bewege Sharky mit den Pfeiltasten auf deiner Tastatur oder per Touch-Pad im Mobile-Modus.<br>
        Schieße eine Blase mit der S-Taste auf deine Gegner oder verpasse ihnen einen Slap mit der D-Taste!<br>
        <br>
        <h3>Pufferfisch</h3><br>
        Bläst sich alle paar Sekunden auf und verursacht dann mehr Schaden. Nur mit der SLAP Attacke besiegbar – Blasen zerplatzen an seinen Stacheln.<br>
        <br>
        <h3>Jellyfish</h3><br>
        Nicht slappen – Stromschlag! Verwende stattdessen den Blasenangriff (SHOOT). Vorsicht: Nach dem ersten Treffer verdoppelt er seinen Schaden!<br>
        <br>
        <h3>Endboss</h3><br>
        Weder der Slap noch normale Blasen richten Schaden an.<br> 
        Während dem Bosskampf fallen regelmäßig Giftflaschen von oben herab – schwimme gekonnt ober und unterhalb an ihm vorbei und sammle 2 davon ein, um ihm mit einer Giftblase Schaden zuzufügen.<br>
        Nach jedem Angriff musst du erneut 2 Flaschen einsammeln.<br>
        Erwische ihn 3 mal bevor er dich erwischt!<br>
        <br>
        <h3>Coins</h3><br>
        Für jede eingesammelte Münze erhöht sich die Geschwindigkeit des Charakters etwas. Dies dürfte sich im Bosskampf als nützlich herausstellen.
    `;
}