# Express.js REST-API für Aufgabenmanagement

Eine vollständige REST-API für ein Aufgabenmanagement-System (Todo-Liste) mit Express.js und moderner Web-Anwendung.

## 📋 Features

### Backend (REST-API)

- ✅ CRUD-Operationen für Aufgaben
- ✅ MVC-Architektur
- ✅ In-Memory-Datenquelle
- ✅ Zentrale Fehlerbehandlung
- ✅ Request-Logging & Validierung
- ✅ CORS-Support

### Frontend (Web-App)

- ✅ Moderne, responsive UI
- ✅ Aufgaben erstellen, bearbeiten, löschen
- ✅ Filter & Live-Statistiken
- ✅ Toast-Benachrichtigungen
- ✅ GitHub Pages ready

## 🏗️ Projektstruktur

```
Express_Rest_API/
├── backend/               # Express.js REST-API
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── package.json
│   └── README.md
├── frontend/              # Web-Anwendung
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── README.md
├── index.html             # GitHub Pages (Kopie)
├── styles.css
├── app.js
├── README.md
├── API_TESTS.md
├── GITHUB_SETUP.md
├── WEB_APP_DOCUMENTATION.md
└── PROJECT_SUMMARY.md
```

## 🚀 Schnellstart

### Backend starten

```bash
cd backend
npm install
npm start
```

Server läuft auf: http://localhost:3000

### Frontend nutzen

**Option 1: Mit Backend (lokal)**

- Backend starten
- Browser öffnen: http://localhost:3000

**Option 2: GitHub Pages**

- Repository auf GitHub pushen
- GitHub Pages aktivieren
- API-URL in `app.js` anpassen

## 📚 API-Endpunkte

```
GET    /api/tasks       # Alle Aufgaben
GET    /api/tasks/:id   # Einzelne Aufgabe
POST   /api/tasks       # Neue Aufgabe
PUT    /api/tasks/:id   # Aufgabe aktualisieren
DELETE /api/tasks/:id   # Aufgabe löschen
GET    /api/health      # Health Check
```

## 🌐 GitHub Pages Setup

1. **Repository erstellen** auf GitHub
2. **Pages aktivieren**: Settings → Pages → Source: main/root
3. **API-URL anpassen** in `app.js`:
   ```javascript
   const API_URL = "https://dein-backend-url.com/api";
   ```
4. **Pushen und testen**

## 📖 Dokumentation

- **Backend**: `backend/README.md`
- **Frontend**: `frontend/README.md`
- **Web-App Details**: `WEB_APP_DOCUMENTATION.md`
- **API-Tests**: `API_TESTS.md`
- **GitHub Setup**: `GITHUB_SETUP.md`
- **Projekt-Übersicht**: `PROJECT_SUMMARY.md`

## 🎨 Web-App Features

- ➕ Aufgaben erstellen
- ✏️ Aufgaben bearbeiten (Modal)
- ✅ Status ändern (offen ↔ erledigt)
- 🗑️ Aufgaben löschen
- 🔍 Nach Status filtern
- 📊 Live-Statistiken
- 💬 Toast-Benachrichtigungen
- 📱 Vollständig responsive

## 🔧 Datenmodell

```javascript
{
  id: string,              // Automatisch generiert
  title: string,           // Titel der Aufgabe
  description: string,     // Beschreibung
  completed: boolean,      // Status
  createdAt: string,       // ISO 8601 Zeitstempel
  updatedAt: string        // ISO 8601 Zeitstempel
}
```

## 🏛️ Architektur

**MVC-Pattern:**

- **Model**: `task.model.js`, `task.repository.js`
- **Service**: `task.service.js` (Geschäftslogik)
- **Controller**: `task.controller.js` (HTTP-Handling)
- **Routes**: `task.routes.js`, `index.js`

**Middleware:**

- CORS (`cors.middleware.js`)
- Logging (`logger.middleware.js`)
- Error Handling (`error.middleware.js`)
- Validation (`validation.middleware.js`)

## 🧪 Testen

### Mit PowerShell

```powershell
# Alle Aufgaben abrufen
Invoke-WebRequest -Uri "http://localhost:3000/api/tasks" | Select-Object -ExpandProperty Content

# Neue Aufgabe erstellen
$body = @{
    title = "Test"
    description = "Test-Aufgabe"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/tasks" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

Mehr Beispiele: `API_TESTS.md`

## 🛠️ Entwicklung

```bash
# Backend mit Auto-Reload
cd backend
npm run dev

# Frontend wird automatisch vom Backend bereitgestellt
```

## 📦 Deployment

### Backend

- Node.js Server (Heroku, Railway, Render, etc.)
- Umgebungsvariablen konfigurieren
- `npm start` auf Server

### Frontend

- GitHub Pages (kostenlos)
- Netlify, Vercel (alternativ)
- Statische Dateien: `index.html`, `styles.css`, `app.js`

## ⚠️ Wichtige Hinweise

- **In-Memory-Datenbank**: Daten gehen bei Server-Neustart verloren
- **Produktion**: Echte Datenbank verwenden (MongoDB, PostgreSQL)
- **CORS**: Für Produktion Domains einschränken
- **API-URL**: In `app.js` für Production anpassen

## 🤝 Beitragen

1. Fork das Repository
2. Feature-Branch erstellen
3. Änderungen committen
4. Pull Request erstellen

## 📄 Lizenz

ISC

## 👤 Autor

Entwickelt als Express.js Learning Project

---

**Viel Erfolg mit deinem Aufgabenmanagement-System! 🚀**
