# Task Management System - Backend

Express.js REST-API für das Aufgabenmanagement-System.

## 🚀 Installation

```bash
cd backend
npm install
```

## 🏃 Server starten

```bash
# Produktionsmodus
npm start

# Entwicklungsmodus (mit Auto-Reload)
npm run dev
```

Der Server läuft auf: http://localhost:3000

## 📚 API-Endpunkte

- `GET /api/tasks` - Alle Aufgaben abrufen
- `GET /api/tasks/:id` - Einzelne Aufgabe abrufen
- `POST /api/tasks` - Neue Aufgabe erstellen
- `PUT /api/tasks/:id` - Aufgabe aktualisieren
- `DELETE /api/tasks/:id` - Aufgabe löschen
- `GET /api/health` - Health Check

## 🏗️ Struktur

```
backend/
├── src/
│   ├── controllers/       # HTTP-Request-Handler
│   ├── services/          # Geschäftslogik
│   ├── models/            # Datenmodelle
│   ├── routes/            # API-Routen
│   ├── middleware/        # Express-Middleware
│   ├── utils/             # Hilfsfunktionen
│   ├── app.js             # Express-App
│   └── server.js          # Server-Entry-Point
├── package.json
└── README.md
```

## 📖 Vollständige Dokumentation

Siehe Haupt-README.md im Projektverzeichnis
