# Web-Anwendung für die Task Management API

## Übersicht

Eine vollständige, moderne Web-Anwendung zur Verwaltung von Aufgaben, die die Express.js REST-API nutzt.

## Features

### ✨ Funktionen

- **Aufgaben erstellen**: Neue Aufgaben mit Titel und Beschreibung anlegen
- **Aufgaben anzeigen**: Übersichtliche Liste aller Aufgaben
- **Aufgaben bearbeiten**: Bestehende Aufgaben in einem Modal bearbeiten
- **Status ändern**: Aufgaben als erledigt/offen markieren
- **Aufgaben löschen**: Mit Bestätigungsdialog
- **Filtern**: Nach allen, offenen oder erledigten Aufgaben filtern
- **Statistiken**: Live-Anzeige von Gesamt-, erledigten und offenen Aufgaben
- **Echtzeit-Updates**: Alle Änderungen werden sofort angezeigt

### 🎨 Design-Features

- **Modernes UI**: Cleanes, minimalistisches Design
- **Responsive**: Funktioniert auf Desktop, Tablet und Smartphone
- **Toast-Benachrichtigungen**: Erfolgs- und Fehlermeldungen
- **Loading-Spinner**: Visuelles Feedback bei API-Anfragen
- **Animationen**: Sanfte Übergänge und Hover-Effekte
- **Accessibility**: Semantisches HTML und gute Kontraste

## Technischer Stack

- **HTML5**: Semantisches Markup
- **CSS3**: Custom Properties, Flexbox, Grid, Animationen
- **JavaScript (ES6+)**: Async/Await, Fetch API, DOM-Manipulation
- **REST-API**: Vollständige Integration mit Backend

## Projektstruktur

```
public/
├── index.html      # Hauptseite mit HTML-Struktur
├── styles.css      # Komplettes Styling mit CSS3
└── app.js          # JavaScript-Logik und API-Integration
```

## Installation & Start

1. **Server starten:**

   ```bash
   npm start
   ```

2. **Browser öffnen:**
   - Navigiere zu: http://localhost:3000
   - Die Web-Anwendung wird automatisch geladen

## Verwendung

### Neue Aufgabe erstellen

1. Fülle das Formular oben aus:
   - **Titel**: Kurze Beschreibung der Aufgabe
   - **Beschreibung**: Detaillierte Informationen
2. Klicke auf "Aufgabe hinzufügen"
3. Die Aufgabe erscheint sofort in der Liste

### Aufgabe bearbeiten

1. Klicke auf den "Bearbeiten"-Button bei einer Aufgabe
2. Ändere die gewünschten Felder im Modal
3. Markiere optional "Als erledigt markieren"
4. Klicke auf "Speichern"

### Status ändern

- Klicke auf "Erledigt" bei einer offenen Aufgabe → wird als erledigt markiert
- Klicke auf "Wiederherstellen" bei einer erledigten Aufgabe → wird wieder geöffnet

### Aufgabe löschen

1. Klicke auf den "Löschen"-Button
2. Bestätige die Sicherheitsabfrage
3. Die Aufgabe wird permanent gelöscht

### Filtern

- **Alle**: Zeigt alle Aufgaben an
- **Offen**: Nur nicht erledigte Aufgaben
- **Erledigt**: Nur abgeschlossene Aufgaben

## API-Integration

### Verwendete Endpunkte

Die Anwendung nutzt folgende API-Endpunkte:

```javascript
GET    /api/tasks        // Alle Aufgaben laden
GET    /api/tasks/:id    // Einzelne Aufgabe laden (nicht direkt genutzt)
POST   /api/tasks        // Neue Aufgabe erstellen
PUT    /api/tasks/:id    // Aufgabe aktualisieren
DELETE /api/tasks/:id    // Aufgabe löschen
```

### API-Konfiguration

Die API-URL ist in `app.js` definiert:

```javascript
const API_URL = "http://localhost:3000/api";
```

Für Produktion kann diese URL angepasst werden.

## Code-Struktur

### JavaScript-Funktionen

**State Management:**

- `tasks` - Array mit allen Aufgaben
- `currentFilter` - Aktueller Filter (all/pending/completed)

**API-Funktionen:**

- `loadTasks()` - Lädt alle Aufgaben vom Server
- `handleCreateTask()` - Erstellt neue Aufgabe
- `toggleTaskComplete()` - Ändert Aufgabenstatus
- `deleteTask()` - Löscht Aufgabe
- `handleUpdateTask()` - Aktualisiert Aufgabe

**Render-Funktionen:**

- `renderTasks()` - Zeigt Aufgabenliste an
- `createTaskElement()` - Erstellt HTML für eine Aufgabe
- `updateStats()` - Aktualisiert Statistiken

**UI-Helfer:**

- `showLoading()` - Zeigt/versteckt Loading-Spinner
- `showToast()` - Zeigt Benachrichtigung
- `openEditModal()` - Öffnet Bearbeitungs-Modal
- `closeEditModal()` - Schließt Modal

### CSS-Struktur

**Variablen (CSS Custom Properties):**

```css
:root {
  --primary-color: #4f46e5;
  --success-color: #22c55e;
  --danger-color: #ef4444;
  /* ... weitere Farben und Werte */
}
```

**Hauptkomponenten:**

- Container & Layout
- Formulare & Inputs
- Buttons & Actions
- Task-Liste & Task-Items
- Modal & Overlay
- Toast-Benachrichtigungen
- Loading-Spinner
- Responsive Design (Media Queries)

## Responsive Design

Die Anwendung passt sich automatisch an verschiedene Bildschirmgrößen an:

### Desktop (> 768px)

- Maximale Breite: 900px
- Mehrspaltige Statistiken
- Buttons nebeneinander

### Mobile (≤ 768px)

- Volle Breite mit Padding
- Einspaltige Layouts
- Gestapelte Buttons
- Optimierte Toast-Größen

## Fehlerbehandlung

### API-Fehler

- Netzwerkfehler werden in Toast-Benachrichtigungen angezeigt
- Fehlerhafte Anfragen zeigen spezifische Fehlermeldungen
- Loading-Spinner wird bei Fehlern korrekt ausgeblendet

### Validierung

- Pflichtfelder werden vom Browser validiert
- Zusätzliche Client-seitige Validierung
- Trimmen von Whitespace bei Eingaben

### Sicherheit

- XSS-Schutz durch `escapeHtml()`-Funktion
- Bestätigungsdialoge bei destruktiven Aktionen
- CORS-Konfiguration im Backend

## Browser-Kompatibilität

**Unterstützte Browser:**

- Chrome/Edge (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)

**Verwendete moderne Features:**

- Fetch API
- Async/Await
- ES6 Modules
- CSS Grid & Flexbox
- CSS Custom Properties

## Anpassungen

### Farben ändern

Bearbeite die CSS-Variablen in `styles.css`:

```css
:root {
  --primary-color: #4f46e5; /* Hauptfarbe ändern */
  --success-color: #22c55e; /* Erfolgsfarbe ändern */
}
```

### API-URL ändern

Bearbeite die Konstante in `app.js`:

```javascript
const API_URL = "https://deine-api.example.com/api";
```

### Texte anpassen

Alle Texte sind direkt in `index.html` und `app.js` zu finden und können einfach geändert werden.

## Performance-Optimierung

- **Minimales Re-Rendering**: Nur geänderte Elemente werden aktualisiert
- **Debouncing**: Könnte für Suchfunktionen hinzugefügt werden
- **Lazy Loading**: Aktuell nicht benötigt bei kleinen Datenmengen
- **Caching**: Browser-Cache für statische Assets

## Zukünftige Erweiterungen

Mögliche Features für die Zukunft:

- 🔍 **Suchfunktion**: Aufgaben nach Titel/Beschreibung durchsuchen
- 🏷️ **Tags/Kategorien**: Aufgaben kategorisieren
- 📅 **Fälligkeitsdaten**: Deadlines hinzufügen
- ⭐ **Prioritäten**: Wichtige Aufgaben markieren
- 📊 **Erweiterte Statistiken**: Diagramme und Analysen
- 🔔 **Erinnerungen**: Push-Benachrichtigungen
- 👥 **Mehrbenutzer**: Login und Benutzerverwaltung
- 💾 **Persistente Datenbank**: MongoDB/PostgreSQL statt In-Memory
- 🌙 **Dark Mode**: Dunkles Theme als Option
- 📱 **Progressive Web App**: Offline-Funktionalität

## Troubleshooting

### Aufgaben werden nicht geladen

- Überprüfe, ob der Server läuft: `npm start`
- Öffne die Browser-Konsole (F12) für Fehler
- Prüfe die API-URL in `app.js`

### CORS-Fehler

- CORS-Middleware ist im Backend aktiviert
- Bei Problemen prüfe `src/middleware/cors.middleware.js`

### Styling-Probleme

- Cache leeren: Strg+F5 (Windows) oder Cmd+Shift+R (Mac)
- Überprüfe, ob `styles.css` korrekt geladen wird

## Support & Dokumentation

- **Backend-API**: Siehe `README.md` im Hauptverzeichnis
- **API-Tests**: Siehe `API_TESTS.md` für Beispiele
- **GitHub Setup**: Siehe `GITHUB_SETUP.md` für Repository-Erstellung
