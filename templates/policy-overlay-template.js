function policyOverlayTemplate() {
    return `
        <button id="closeOverlayBtn" onclick="closeOverlay()">✕</button>
        <h2>Rechtliches</h2>

        <div id="impressum">
            <h3>Impressum</h3>

            <p>Daniel Stuermer<br>
                Banzhaldenstrasse 89<br>
                70469 Stuttgart
            </p>

            <h3>Kontakt</h3>
            <p>stuermer.dan137@gmail.com</p>

            <p>Quelle:<a href="https://www.e-recht24.de"> e-recht24.de</a></p>

        </div>

        <div id='generator_results'>
            <div id='generator_results_content'>
                <h2>Datenschutzhinweise</h2>
                <h3>Verantwortlicher</h3>
                <p>Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutz-Grundverordnung
                    (DSGVO), ist:</p>
                <p class='generator_user_input'>Daniel Stuermer</p>
                <h3>Ihre Betroffenenrechte</h3>
                <p>Unter den angegebenen Kontaktdaten können Sie gemäß EU-Datenschutz-Grundverordnung (DSGVO) jederzeit
                    folgende Rechte ausüben:</p>
                <ul>
                    <li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),</li>
                    <li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),</li>
                    <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
                    <li>Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch
                        nicht löschen dürfen (Art. 18 DSGVO),</li>
                    <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und</li>
                    <li>Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit
                        uns abgeschlossen haben (Art. 20 DSGVO).</li>
                </ul>
                <p>Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft
                    widerrufen.</p>
                <p>Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z. B. an die zuständige
                    Aufsichtsbehörde des Bundeslands Ihres Wohnsitzes oder an die für uns als verantwortliche Stelle
                    zuständige Behörde.</p>
                <p>Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich) mit Anschrift finden Sie unter: <a
                        href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html">https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html</a>.
                </p>
                <h3>Verarbeitungstätigkeiten</h3>
                <h3>Information über Ihr Widerspruchsrecht nach Art. 21 DSGVO</h3>
                <h4>Einzelfallbezogenes Widerspruchsrecht</h4>
                <p>Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die
                    Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund Art. 6 Abs. 1 lit. f DSGVO
                    (Datenverarbeitung auf der Grundlage einer Interessenabwägung) erfolgt, Widerspruch einzulegen; dies
                    gilt auch für ein auf diese Bestimmung gestütztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO.</p>
                <p>Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei denn,
                    wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte
                    und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung
                    von Rechtsansprüchen.</p>
                <h3>Empfänger eines Widerspruchs</h3>
                <p class='generator_user_input'>Daniel Stuermer</p>
                <h2>Änderung unserer Datenschutzerklärung</h2>
                <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen
                    Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen,
                    z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue
                    Datenschutzerklärung.</p>
                <h3>Fragen zum Datenschutz</h3>
                <p>Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail an den oben genannten
                    Verantwortlichen.</p>
                <h3>Urheberrechtliche Hinweise</h3>
                <p><em>Diese Datenschutzerklärung wurde mit Hilfe der activeMind AG erstellt – den Experten für <a
                            href="https://www.activemind.de/datenschutz/datenschutzbeauftragter/" target="_blank"
                            rel="noopener dofollow">externe Datenschutzbeauftragte</a> (Version #2024-10-25).</em></p>
            </div>
        </div>
        `;
}