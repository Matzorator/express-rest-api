# Task Management System - Frontend

Moderne Web-Anwendung für das Aufgabenmanagement.

## 🌐 Verwendung

### Lokal mit Backend

1. Backend starten (siehe `backend/README.md`)
2. Browser öffnen: http://localhost:3000
3. Die Frontend-Dateien werden automatisch vom Backend ausgeliefert

### Standalone (ohne Backend)

Öffne `index.html` direkt im Browser. **Hinweis:** Die API-Funktionen benötigen ein laufendes Backend.

### GitHub Pages

Die `index.html` im Stammverzeichnis ist für GitHub Pages vorbereitet:

1. Repository auf GitHub pushen
2. GitHub Pages aktivieren (Settings → Pages)
3. Source: `main` Branch, root folder
4. **Wichtig:** API-URL in `app.js` anpassen!

## 📁 Dateien

- `index.html` - Hauptseite
- `styles.css` - Styling & Design
- `app.js` - JavaScript-Logik & API-Integration

## ⚙️ Konfiguration

### API-URL ändern (für GitHub Pages)

Bearbeite `app.js`:

```javascript
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api" // Lokal
    : "https://your-backend-url.com/api"; // Production
```

## 🎨 Features

- ✅ Aufgaben erstellen, bearbeiten, löschen
- ✅ Status-Verwaltung (offen/erledigt)
- ✅ Filter-Funktionen
- ✅ Live-Statistiken
- ✅ Responsive Design
- ✅ Toast-Benachrichtigungen

## 📖 Vollständige Dokumentation

Siehe WEB_APP_DOCUMENTATION.md im Projektverzeichnis
