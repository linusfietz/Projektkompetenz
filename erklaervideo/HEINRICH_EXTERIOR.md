# HeinrichExteriorIntro

5 Sekunden · 150 Frames · 30 FPS · 1920 × 1080 · H.264-Vorschau ohne Audio.

## Verbindliche Vorlage

`public/HeinrichKG_Unternehmen.png` wurde gezielt aus `origin/main` (f10df8c) übernommen. Die Originaldatei bleibt unverändert. Gebäude, Firmenlogo, Beschriftung, Fenster und Perspektive werden direkt aus der Vorlage angezeigt und nicht nachgezeichnet. Die minimale Anpassung des Bildseitenverhältnisses von 1672 × 941 auf 1920 × 1080 beträgt etwa 0,05 %; kein Beschnitt des Schriftzugs.

Die Szene arbeitet durchgehend in den Koordinaten der Originaldatei. `ExteriorBackground` ist eine statische SVG-Ebene: Der ursprünglich eingezeichnete LKW und sein Kontaktschatten werden durch feste Masken, gespiegelte benachbarte Bildbereiche und eine ergänzte SVG-Bepflanzung bereinigt. Das Gebäude liegt vollständig außerhalb dieser Bereinigung. Es gibt keine generierten Einzelbilder, Zufallswerte, Kamerabewegungen oder zeitabhängigen CSS-Animationen.

## Unabhängige Ebenen

- `ExteriorBackground`: unveränderliche Gebäudedarstellung und bereinigter rechter Rand.
- `Truck`: eigenständige SVG-Grafik mit zwei separat rotierenden Rädern; Radrotation aus Wegstrecke und Radius abgeleitet.
- `WalkingCharacter`: einfache selbst gezeichnete Figur mit Arm- und Beinbewegung; Skalierung um den Bodenkontaktpunkt.
- `EntranceDoor`: zwei Flügel aus den Originalpixeln der Tür; bei Öffnung perspektivisch verengt. Die Figur wird beim Eintritt durch eine geometrische Maske verdeckt.
- `motion.ts`: gesamte deterministische Frame-Logik, ohne Seiteneffekte.

Der LKW steht bis Frame 15, beschleunigt zehn Frames und fährt danach gleichmäßig nach rechts. Bei Frame 120 ist er vollständig außerhalb des Bildes. Die Figur läuft zum tatsächlichen Eingang, wird perspektivisch kleiner und hält kurz an der Schwelle. Die Tür öffnet von Frame 105 bis 119, bleibt während des Eintritts offen und schließt bis Frame 147. Ab Frame 135 ist die Figur vollständig im Gebäude.

Sprechertext und Musik können später als separate Remotion-Audio-/Sequence-Ebenen neben dem SVG in `HeinrichExteriorIntro` ergänzt werden. Die Bildanimation benötigt weder Audiosynchronisation noch Medien-Downloads.

## Prüfergebnisse

TypeScript und ESLint: `npm run lint` erfolgreich. Bewegungsinvarianten: `node scripts/check-heinrich-motion.mjs` erfolgreich. Vorhandene Kompositionen `MyComp` und `DesignPreview` bleiben unverändert.

Die Frames 0, 30, 60, 90, 120 und 149 wurden einzeln gerendert und visuell geprüft:

| Frame | LKW-X | Figur-X / Y | Figur-Skalierung | Tür / Zustand                                |
| ----- | ----: | ----------: | ---------------: | -------------------------------------------- |
| 0     |  1155 |  1240 / 870 |            1,000 | geschlossen, LKW steht                       |
| 30    |  1211 |  1085 / 822 |            0,879 | geschlossen, beide unterwegs                 |
| 60    |  1379 |   930 / 774 |            0,759 | geschlossen, LKW fährt nach rechts           |
| 90    |  1547 |   770 / 721 |            0,638 | geschlossen, Figur vor dem Eingang           |
| 120   |  1715 |   646 / 676 |            0,546 | offen, Eintritt beginnt; LKW vollständig weg |
| 149   |  1715 |    verdeckt |                – | geschlossen, Figur im Gebäude                |

Pixelvergleich: Gebäude und Schriftzug sind zwischen Start und Ende identisch. Zwischen Frame 120 und 149 liegen sämtliche geänderten Pixel ausschließlich im Türbereich (Ausgabekoordinaten x=678–818, y=609–779). Keine doppelten Fahrzeuge oder Figuren sichtbar.

Vollständiger MP4-Render erfolgreich, mit ffprobe bestätigt: H.264, 1920 × 1080, 30/1 FPS, 150 Frames, 5,000 Sekunden, keine Audiospur.

```sh
npm run lint
node scripts/check-heinrich-motion.mjs
npx remotion render HeinrichExteriorIntro out/heinrich-exterior-intro.mp4
npx remotion still HeinrichExteriorIntro out/heinrich/frame-120.png --frame=120
```

In der Cloud wurde jeweils `--browser-executable=/usr/bin/chromium` verwendet. Vorschau und QA-Bilder liegen unter `out/` und werden nicht in Git eingecheckt. Der Feature-Branch basiert auf dem DesignPreview-Stand 62e9248.
