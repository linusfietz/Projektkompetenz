# DesignPreview

30 Sekunden · 1920 × 1080 · 30 FPS · ohne Audio.

- Frames 0–299: Büro, zwei eigenständige geometrische Platzhalterfiguren, Reaktion auf offene Rechnungen und zwei Sprechblasen.
- Frames 300–599: Liquidität 2. Grades, Formel, animiertes Rechenbeispiel und Einordnung.
- Frames 600–899: Kapitel „Lernfeld 9 – Liquidität und Finanzierung“ und drei Themenkarten.

## Komponenten und Austausch

`src/DesignPreview/design.tsx` bündelt Palette, Typografie, Reveal, Panel, SceneLabel, SpeechBubble, TopicIcon und PlaceholderCharacter. Alle Bewegungen werden mit Remotion-Frames, interpolate und spring berechnet; keine zeitabhängigen CSS-Animationen und keine externen Assets.

`DesignPreview` akzeptiert optional eine `Character`-Komponente mit `CharacterProps`. So können die finalen Figuren ohne Änderungen am Szenenablauf eingesetzt werden. Alternativ lässt sich `PlaceholderCharacter` zentral ersetzen. Farben, Outlines und Abstände sind bewusst reduziert. Die Systemschrift Arial/Helvetica benötigt keinen Download.

## Fachliche Prüfung

Liquidität 2. Grades = (flüssige Mittel + kurzfristige Forderungen) / kurzfristige Verbindlichkeiten × 100.

Beispiel: (20.000 € + 30.000 €) / 40.000 € × 100 = 125 %. Vorräte werden nicht berücksichtigt. Die Kennzahl beschreibt die rechnerische Deckung zum Stichtag; tatsächliche Zahlungsfähigkeit hängt auch von Zahlungseingängen und Fälligkeiten ab. Deshalb wird keine garantierte Zahlungsfähigkeit aus 125 % abgeleitet.

## Lokal prüfen

```sh
npm ci
npm run lint
npx remotion compositions
npx remotion render DesignPreview out/design-preview.mp4
```

`MyComp` bleibt unverändert. Im Ausgangsstand auf `main` ist keine `CartoonDemo` registriert oder als Datei vorhanden.
