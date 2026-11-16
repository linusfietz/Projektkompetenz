# Heinrich KG – Buchhaltung Animationstest V1

`HeinrichOfficePreview`: 1920 × 1080, 30 FPS, 150 Frames (5 Sekunden), ohne Audio.
Visueller Prototyp; Figur, Dialog und Lerninhalt sind vorläufig.

## Vorschau und Render

```sh
npm ci
npm run dev
npm run lint
npx remotion render src/index.ts HeinrichOfficePreview out/HeinrichOfficePreview.mp4 --codec=h264
```

Auf der Cloud-Maschine wurde zusätzlich `--browser-executable=/usr/bin/chromium --concurrency=2` verwendet.
Render-Ausgaben liegen im ignorierten Verzeichnis `out/`.

## Aufbau

- `OfficeBackground`: Originaldatei aus `main`, bytegleich (SHA-256 `d31c20fcf29185e20f7e37147c9e37211eeb2ccb9d01e4506da9baa269f97498`). Feste Kamera, zwei lokal ersetzte Blattbereiche mit höchstens 0,3° Bewegung und dezente Monitorreflexe. Keine zusätzliche Pflanzenkopie; Büro und Mobiliar bleiben fest.
- `Employee`: selbst gezeichneter SVG-Cartoon mit getrennten Beinen, Armen, Augen und Mund. Drei Schritte von Frame 30 bis 72, anschließend Drehung und Lächeln bis Frame 89. Ab Frame 90 Handgeste und Sprechbewegung, Blinzeln bei Frames 83 und 126.
- `motion`: gemeinsames Timing, Stand- und Schwungphasen. In der Standphase kompensiert die Fußbewegung die Translation der Figur exakt. Beim Drehen bleiben die Füße fest.
- `SpeechBubble`: weiche Einblendung ab Frame 92, vollständig sichtbar ab Frame 106.

Bestehende Kompositionen `MyComp`, `HeinrichExteriorIntro` und `DesignPreview` bleiben registriert.

## Prüfung

- `npm run lint` (ESLint und TypeScript)
- Kompositionsliste mit allen vier Kompositionen
- Vollständiger H.264-MP4-Render aller 150 Frames
- `ffprobe`: 1920 × 1080, 30 FPS, 150 Frames, 5 Sekunden, keine Audiospur
- Kontrollbilder für Büro, Gehphase, Drehung und Sprechpose
