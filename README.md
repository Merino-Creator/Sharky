# 🦈 Sharky

> Ein browserbasietes 2D-Actionspiel – direkt im Canvas, ohne Frameworks, ohne Kompromisse.

---

## 🎮 Über das Projekt

**Sharky** ist ein in purem JavaScript entwickeltes 2D-Spiel, das vollständig im HTML5-`<canvas>` läuft. Der Spieler steuert einen Hai durch die Tiefen des Ozeans, weicht Hindernissen aus, jagt Beute und kämpft gegen Gegner – alles flüssig animiert und direkt im Browser spielbar.

Das Projekt entsteht ohne externe Game-Engines oder UI-Frameworks – alles wird von Grund auf selbst implementiert: Spielschleife, Kollisionserkennung, Animationssystem und mehr.

---

## 🛠️ Verwendete Skills & Technologien

### Kernsprache
- **Vanilla JavaScript (ES6+)** – Klassen, Module, Arrow Functions, Destructuring

### Canvas & Rendering
- **HTML5 Canvas API** – 2D-Rendering-Kontext (`ctx`), Sprites zeichnen, Transformationen
- **RequestAnimationFrame** – Flüssige, frame-basierte Spielschleife
- **Sprite-Animation** – Spritesheets, Frame-Management, Animationszyklen

### Spiellogik
- **OOP (Objektorientierte Programmierung)** – Klassen für Spieler, Gegner, Projektile, etc.
- **Kollisionserkennung** – AABB (Axis-Aligned Bounding Box) und Hitbox-Logik
- **State Management** – Spielzustände (Start, Playing, Game Over, Win)
- **Delta-Time** – Framerate-unabhängige Bewegungsberechnung

### Assets & Sound
- **Image-Objekte** – Laden und Verwalten von Grafiken
- **Web Audio API** – Soundeffekte und Hintergrundmusik

### Projektstruktur
- **Modulares JavaScript** – Saubere Trennung von Klassen in eigene Dateien
- **Event Handling** – Tastatur- und Mauseingaben verwalten
- **DOM-Manipulation** – Canvas einbinden, UI-Elemente steuern

---

## 🚀 Ziele

- [ ] Spielfigur (Sharky) mit Animationen implementieren
- [ ] Scrollende Spielwelt mit Parallax-Hintergrund
- [ ] Gegner-KI entwickeln
- [ ] Angriffs- und Kollisionssystem aufbauen
- [ ] Levelende & Win-Condition definieren
- [ ] Sounddesign integrieren
- [ ] Highscore & UI-Elemente

---

## ▶️ Starten

```bash
# Einfach index.html im Browser öffnen
# oder einen lokalen Dev-Server starten:
npx live-server
```

---

*Tauche ein. Die Tiefsee wartet.* 🌊