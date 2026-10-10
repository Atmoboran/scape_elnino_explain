# SCAPE° – El Niño und Europa (Erklärvideo)

Ein animiertes Erklärvideo (98 s, 1920×1080, 30 fps, ohne Ton) im Corporate Design von SCAPE°.
Es beruht auf dem DWD-Thema des Tages vom 23.08.2026: *„Mögliche Auswirkungen eines starken El-Niño auf Europa?“* (Nico Bauer).

- `scape_el_nino.mp4`: fertiges Video
- `index.html`: die Animation als Webseite mit Play/Pause und Zeitleiste (einfach im Browser öffnen, Leertaste = Play/Pause)
- `render.cjs`: rendert `index.html` Bild für Bild mit Playwright und kodiert das Ergebnis mit ffmpeg

## Szenen

| Zeit | Szene | Inhalt |
|---|---|---|
| 0–8 s | EL NI–ÑO | Titel: Was bedeutet ein starker El Niño für Europa? |
| 8–27 s | Was ist El Niño? | Passatwinde, warmes Wasser, Wolken und Regen: Normalzustand und El Niño im Vergleich |
| 27–39 s | Super-El-Niño? | RONI-Höchstwerte 1997/98 und 2015/16 (≈ +2,4 °C) sowie die Prognose 2026/27, Höhepunkt im Spätherbst bzw. Frühwinter |
| 39–51 s | Und Europa? | Das Signal ist schwach und wirkt nur indirekt über die großräumige Strömung |
| 51–63 s | Frühwinter | Verstärkte Westströmung, eher mild und nass |
| 63–79 s | Später im Winter | Polarwirbel gestört, negative NAO, welliger Jetstream, Kaltluft möglich |
| 79–89 s | Aber: kein Automatismus | Starker El Niño ≠ kalter Winter |
| 89–98 s | Abspann | Logo, Claim, Kontakt, Quelle |

## Neu rendern

```bash
NODE_PATH=$(npm root -g) node render.cjs scape_el_nino.mp4 30
# einzelne Standbilder:
NODE_PATH=$(npm root -g) node render.cjs --stills 5,20,40 ./stills
```

Benötigt werden Node.js, Playwright (mit Chromium) und ffmpeg.

## Hinweise

- **Schrift:** Die Hausschrift Founders Grotesk ist lizenzpflichtig und hier nicht installiert. Gerendert wurde deshalb mit dem Ersatz **Inter**. Ist Founders Grotesk installiert, wird sie automatisch verwendet; danach einfach neu rendern.
- **Gestaltung nach CD:** Ebene 1 sind rechteckige Farbfelder (kräftige Töne mit Pastell kombiniert), Ebene 2 kleine Vollflächen, Ebene 3 große, angeschnittene Linien. Text ist schwarz (weiß auf dunklen Feldern), Headlines in Versalien mit Gedankenstrich-Trennung, Fließtext in gemischter Schreibweise.
- **Inhalt:** Die Darstellung ist bewusst vereinfacht (z. B. der Pazifik-Querschnitt und die Wetterkarten-Skizzen).
