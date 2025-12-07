# GitHub Pages Deployment

Dieses Projekt ist für GitHub Pages optimiert.

## 🌐 Live-Demo

Die `index.html` im Stammverzeichnis ist bereit für GitHub Pages.

## 📝 Setup-Anleitung

### 1. Repository auf GitHub pushen

```bash
git add .
git commit -m "Reorganize: Backend/Frontend structure for GitHub Pages"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/express-rest-api.git
git push -u origin main
```

### 2. GitHub Pages aktivieren

1. Gehe zu deinem Repository auf GitHub
2. **Settings** → **Pages**
3. **Source**: `main` Branch
4. **Folder**: `/ (root)`
5. Klicke auf **Save**

### 3. API-URL konfigurieren

⚠️ **Wichtig**: Da GitHub Pages nur statische Dateien hostet, musst du das Backend separat deployen!

Bearbeite `app.js` (Zeilen 1-4):

```javascript
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "https://dein-backend-url.com/api"; // ← HIER DEINE BACKEND-URL EINTRAGEN
```

### 4. Backend deployen

**Empfohlene Hosting-Optionen (kostenlos):**

#### Option A: Railway.app

```bash
cd backend
# Railway CLI installieren und einrichten
railway init
railway up
```

#### Option B: Render.com

1. Repository auf Render.com verbinden
2. **Root Directory**: `backend`
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`

#### Option C: Heroku

```bash
cd backend
heroku create dein-app-name
git push heroku main
```

### 5. URLs aktualisieren

Nach Backend-Deployment:

1. Kopiere die Backend-URL (z.B. `https://deine-app.railway.app`)
2. Füge `/api` hinzu
3. Trage die URL in `app.js` ein
4. Commit und push:
   ```bash
   git add app.js
   git commit -m "Update API URL for production"
   git push
   ```

### 6. Testen

Öffne: `https://dein-username.github.io/express-rest-api`

## 🔧 Lokale Entwicklung

```bash
# Terminal 1: Backend starten
cd backend
npm install
npm start

# Terminal 2/Browser: Frontend testen
# Öffne http://localhost:3000
```

## 📦 Dateien für GitHub Pages

Diese Dateien werden von GitHub Pages verwendet:

- `index.html` - Haupt-HTML
- `styles.css` - Styling
- `app.js` - JavaScript (mit API-URL-Konfiguration)

Die `frontend/`-Versionen sind identische Kopien für lokale Entwicklung.

## ⚠️ Wichtige Hinweise

1. **Backend erforderlich**: Die Web-App benötigt ein laufendes Backend
2. **CORS**: Backend muss CORS für deine GitHub Pages Domain erlauben
3. **HTTPS**: GitHub Pages verwendet HTTPS, Backend sollte auch HTTPS nutzen
4. **In-Memory-Daten**: Gehen bei Backend-Neustart verloren

## 🆘 Troubleshooting

### Fehler: "Cannot load tasks"

- Backend-URL in `app.js` korrekt?
- Backend läuft und ist erreichbar?
- CORS richtig konfiguriert?

### Fehler: "CORS policy error"

- Backend muss GitHub Pages Domain erlauben
- Prüfe `cors.middleware.js` im Backend

### Fehler: "Mixed Content" (HTTP/HTTPS)

- GitHub Pages nutzt HTTPS
- Backend muss auch HTTPS nutzen
- Railway, Render, Heroku bieten alle HTTPS

## 📚 Weitere Informationen

- **Vollständige Doku**: Siehe `README.md`
- **Backend-Setup**: Siehe `backend/README.md`
- **API-Details**: Siehe `API_TESTS.md`
