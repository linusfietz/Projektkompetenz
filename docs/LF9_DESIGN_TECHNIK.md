# LF9 – Design, Assets und Technik
Stand 16.11.2026

## Visuelle Regie
Eigener 2D-Cartoon/Vektor-Look: Mischung aus professionellem Lernvideo, humorvoller Geschichte und klaren Infografiken. Nicht plastisch, fotorealistisch oder wie wechselnde KI-Frames; einfache Konturen, flächige Farben, bewusst selbstgemacht, aber sauber. Original-Hintergründe möglichst unverändert wiederverwenden; Figuren und bewegliche Objekte getrennt. 16:9, 1920×1080 Projektauflösung, 30 FPS. Bildmaterial ggf. proportional einpassen. Farbpalette: Navy #0F2E57, Türkis #16B7B1, Orange #FF8A00, Hellblau #E6F3FF, Weiß #FFFFFF; neutrale Grautöne. Einheitliche gut lesbare Typografie (z.B. Inter/Montserrat, lokal verfügbar prüfen). Logo orangefarbener Bürostuhl + Heinrich KG; keine fremden Marken. Keine fest eingebauten Charaktere, Sprechblasen oder Lerntabellen in Standardhintergründen; großzügig freie Wand und Boden für Figuren/Overlays (Ziel ca. 40 %). Kein hektischer TikTok-Schnitt, keine unnötigen Effekte.

## Hintergrundbibliothek
| Schauplatz | Stand / Einsatz |
|---|---|
| Außenansicht | Referenz gewählt; `erklaervideo/public/HeinrichKG_Unternehmen.png` auf main bestätigt. LKW, Wolken, Pflanzen; optionale kurze Übergänge. |
| Buchhaltung | Referenz ohne Personen, Möbel links, Freiraum rechts; `erklaervideo/public/HeinrichKG_Buchhaltung.png` auf main bestätigt. Monitor/Benachrichtigung, Pflanzen, natürliches Licht. |
| Produktion | Bild erstellt; Maschinen links, offene Fläche; Upload unter `HeinrichKG_Produktion.png` nicht bestätigt. Förderband/Schalter dezente Bewegung. |
| Lager & Versand | Bild überarbeitet, mehr Freiraum und klarer Unterschied zur Produktion: Tore/Regale statt Maschinen; Upload unter `HeinrichKG_Lager.png` nicht bestätigt. Stapler, Waren, Rolltore. Beim letzten Bild wurde das Stuhllogo abweichend gezeichnet, bei finaler Freigabe vereinheitlichen. |
| Besprechungsraum | Bild erstellt, Konferenztisch und Bildschirm links, rechts Freiraum; Upload unter `HeinrichKG_Besprechungsraum.png` nicht bestätigt. |
| Lernstudio | Freigegebenes Sample 16.11.: heller blauer Hintergrund, dunkelblauer Titel, Kapitelkennzeichnung, orange Akzente, flexible Formelkarten, türkisfarbener Ergebniskasten, Merkkarte. Kein physischer Raum. Als React-Masterlayout mit editierbaren Texten/Formeln, Tabellen, Diagrammen und flexiblen Layouts umsetzen, nicht als festes Bild. |

Assets auf main bestätigen; bestehende Dateinamen exakt beachten. Für weitere Bilder mögliche Namen, noch nicht als vorhandene Dateien behaupten. Standbilder sollen erhalten bleiben; animierte Pflanzenteile, Monitorflächen, Fahrzeuge usw. separat erstellen und alte Formen sauber überdecken, damit keine Doppelbilder entstehen. Die generierten Bilder und Sample-Vorlagen sind nicht Bestandteil dieses Dokumentations-Commits.

## Figuren
Drei wiederkehrende Rollen passend zum Dreierteam, endgültige Figuren noch offen. Einfache geometrische 2D-Vektoren, charakteristische Silhouetten und Kleidung; nicht KI-typische Gesichter oder Strichmännchen. Kopf, Augen, Mund, Arme, Beine getrennt; neutrale Pose, Gehen, Sprechen, Blinzeln, Zeigen, Nachdenken, Überraschung und Gestik. Gehzyklus ohne Gleiten, korrekte Perspektive und Bodenkontakt; später ggf. Lippenbewegungen an Audio anpassen. Nicht den endgültigen Stil aus den bisherigen Platzhaltern ableiten. Historische Rollenideen: Azubi/Fragesteller, Buchhaltung/Fachperson, Geschäftsführung/Moderation.

## Technik und bisherige Branches
Repo linusfietz/Projektkompetenz (öffentlich im bisherigen Screenshot). School-PC: node/npm lokal nicht verfügbar. GitHub Codespaces (orange-giggle), Node v24.22.2 und npm 11.19.1 im damaligen Codespace. Remotion React/TypeScript im Unterordner erklaervideo; initial create-video@4.0.540, Commit 650a8ee. npm meldete damals 11 moderate Sicherheitslücken; bei Gelegenheit npm audit prüfen, nicht blind --force. 
- main: Remotion-Grundprojekt und bestätigte Referenzbilder.
- feat/cartoon-demo: CartoonDemo 20s, zwei Figuren, Rechnungen/Sprechblase/Titel. PR #1: https://github.com/linusfietz/Projektkompetenz/pull/1. Separater älterer Branch.
- feat/design-preview: DesignPreview 30s, Büro/Formel/Kapitelwechsel, wiederverwendbare Komponenten. PR #2: https://github.com/linusfietz/Projektkompetenz/pull/2. Commit 62e9248 als historische Basis. Nutzer grundsätzlich zufrieden; Lernstudio-Screenshot zeigte zwischenzeitlich 50 % statt korrekten 125 % (20.000 + 30.000)/40.000 × 100. Prüfen, ob reine Zähleranimation oder Fehler; im Endframe muss 125 % stehen.
- feat/heinrich-exterior-intro: HeinrichExteriorIntro 5s, auf DesignPreview aufbauend, Referenzbild/Truck/EntranceDoor/WalkingCharacter als Ebenen, Prüfskript. PR #3: https://github.com/linusfietz/Projektkompetenz/pull/3 (Basis feat/design-preview). Nutzerfeedback: Gebäude und LKW gut; Tür und Charakter nicht überzeugend, später mit finalen Figuren verbessern. Codex meldete erfolgreichen Render/ESLint/TypeScript.
- feat/heinrich-office-preview: am 16.11. auf GitHub gefunden, 1 Commit vor exterior, Dateien für Employee, OfficeBackground, SpeechBubble, motion, eigene Komposition und Buchhaltungsbild. Geplant 5s, Figur kommt von rechts, spricht/gestikuliert mit „Liquidität bedeutet Zahlungsfähigkeit!“, ohne Audio. Visuelle Abnahme und Renderstatus in diesem Dokument nicht unabhängig bestätigt. Noch kein gefundener PR im aktuellen Abruf.
Keine automatische Integration; frühere PRs wurden als Entwurf erstellt. CartoonDemo fehlt auf den anderen Feature-Branches wegen abweichender Basis. Cloud-Codex gelegentlich „No usable execution environment is available“, GitHub-PR API gelegentlich Forbidden. Cloud-Umgebung neu starten/veröffentlichen, neue Aufgabe; alternativ Codex CLI in Codespaces nach Freigabe/Setup. Lokaler MP4-Pfad aus Codex Cloud nicht direkt vom Schul-PC erreichbar.

## Codespaces starten
https://github.com/codespaces
Im Terminal (laufenden Dev-Server zuvor mit Ctrl+C beenden, Status prüfen):
```bash
cd /workspaces/Projektkompetenz
git status --short
git fetch origin
git switch feat/heinrich-office-preview
# falls lokal nicht vorhanden: git switch --track origin/feat/heinrich-office-preview
cd erklaervideo
npm run dev
```
Port 3000 im Ports-Tab über Browser öffnen; bei fehlenden Abhängigkeiten npm ci im Projektordner. Keine ungespeicherten Änderungen überschreiben. Für andere Kompositionen passenden Branch wählen. Neue Arbeiten auf abgestimmtem aktuellen Stand, alte Kompositionen erhalten, TypeScript/ESLint und vollständigen Render prüfen, Vorschau/Schlüsselframes visuell kontrollieren; PR statt automatischem Merge. 
Dokumentation liegt auf main; Feature-Branches können sie gezielt übernehmen, ohne bestehende Änderungen zu verlieren.

## Clip-Spezifikation für Codex
Pro Aufgabe: Clip-ID und Kompositionsname, Ausgangsbranch, exakte Assets, Sprechertext/Audio und Zeitmarken, Bildaufbau, gewünschte Bewegung pro Abschnitt, sichtbare Lerngrafiken mit geprüften Zahlen, 1080p/30 FPS, Audio-Sync, Qualitätskriterien. Keine unaufgeforderten neuen Figuren/Kulissen/Fachinhalte, keine künstlichen Sprecherstimmen. Kleine einzelne MP4-Renders, jeweils visuell abnehmen. Finale Zusammenführung erst nach Freigabe.
