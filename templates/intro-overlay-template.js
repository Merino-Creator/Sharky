function introOverlayTemplate() {
    return `
        <button id="closeIntroBtn" onclick="closeIntroOverlay()">✕</button>
        <h2>So wird gespielt!</h2>
        <p>
        <h3>Pufferfisch</h3><br>
        Bläst sich alle paar Sekunden auf und verursacht dann mehr Schaden. Nur mit der SLAP Attacke besiegbar – Blasen zerplatzen an seinen Stacheln.<br>
        <br>
        <h3>Jellyfish</h3><br>
        Nicht slappen – Stromschlag! Verwende stattdessen den Blasenangriff. Vorsicht: Nach dem ersten Treffer verdoppelt er seinen Schaden!<br>
        <br>
        <h3>Endboss</h3><br>
        Weder der Slap noch normale Blasen richten Schaden an. Sammle mindestens 4 Giftflaschen, die von oben herab sinken, um deine Blase zur tödlichen Giftblase zu machen.<br>
        <br>
        <h3>Tipp:</h3><br>
        Eine Giftblase besiegt Jellyfische mit einem einzigen Treffer!
        </p>
    `;
}