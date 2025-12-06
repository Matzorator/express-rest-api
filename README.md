# Express.js REST-API für Aufgabenmanagement

Eine vollständige REST-API für ein Aufgabenmanagement-System (Todo-Liste) mit Express.js, implementiert nach modernen Best Practices und MVC-Architektur.

## 📋 Features

- ✅ CRUD-Operationen für Aufgaben (Tasks)
- ✅ MVC-Architektur (Model-View-Controller ohne Views)
- ✅ In-Memory-Datenquelle für Entwicklung
- ✅ Zentrale Fehlerbehandlung
- ✅ Request-Logging
- ✅ Input-Validierung
- ✅ RESTful API-Design
- ✅ ES6-Module

## 🏗️ Projektstruktur

```
Express_Rest_API/
├── src/
│   ├── controllers/        # Controller-Schicht (HTTP-Request-Handling)
│   │   └── task.controller.js
│   ├── services/          # Service-Schicht (Geschäftslogik)
│   │   └── task.service.js
│   ├── models/            # Model-Schicht (Datenstrukturen & Repository)
│   │   ├── task.model.js
│   │   └── task.repository.js
│   ├── routes/            # Routing-Definition
│   │   ├── index.js
│   │   └── task.routes.js
│   ├── middleware/        # Middleware-Funktionen
│   │   ├── logger.middleware.js
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   ├── utils/             # Hilfsfunktionen und Utilities
│   │   └── errors.js
│   ├── app.js             # Express-App-Konfiguration
│   └── server.js          # Server-Entry-Point
├── package.json
├── .gitignore
└── README.md
```

## 🚀 Installation

1. Repository klonen und in das Verzeichnis wechseln:

```bash
cd Express_Rest_API
```

2. Abhängigkeiten installieren:

```bash
npm install
```

3. Server starten:

```bash
npm start
```

Für Entwicklung mit Auto-Reload (Node.js 18+):

```bash
npm run dev
```

Der Server läuft standardmäßig auf `http://localhost:3000`

## 📚 API-Endpunkte

### Alle Aufgaben abrufen

```http
GET /api/tasks
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "abc123",
      "title": "Projekt Setup",
      "description": "Express.js REST-API einrichten",
      "completed": false,
      "createdAt": "2025-12-07T10:00:00.000Z",
      "updatedAt": "2025-12-07T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

### Einzelne Aufgabe abrufen

```http
GET /api/tasks/:id
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "title": "Projekt Setup",
    "description": "Express.js REST-API einrichten",
    "completed": false,
    "createdAt": "2025-12-07T10:00:00.000Z",
    "updatedAt": "2025-12-07T10:00:00.000Z"
  }
}
```

### Neue Aufgabe erstellen

```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Neue Aufgabe",
  "description": "Beschreibung der Aufgabe",
  "completed": false
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "xyz789",
    "title": "Neue Aufgabe",
    "description": "Beschreibung der Aufgabe",
    "completed": false,
    "createdAt": "2025-12-07T10:30:00.000Z",
    "updatedAt": "2025-12-07T10:30:00.000Z"
  },
  "message": "Aufgabe erfolgreich erstellt"
}
```

### Aufgabe aktualisieren

```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Aktualisierter Titel",
  "completed": true
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "title": "Aktualisierter Titel",
    "description": "Express.js REST-API einrichten",
    "completed": true,
    "createdAt": "2025-12-07T10:00:00.000Z",
    "updatedAt": "2025-12-07T11:00:00.000Z"
  },
  "message": "Aufgabe erfolgreich aktualisiert"
}
```

### Aufgabe löschen

```http
DELETE /api/tasks/:id
```

**Response:**

```json
{
  "success": true,
  "message": "Aufgabe erfolgreich gelöscht"
}
```

### Health Check

```http
GET /api/health
```

**Response:**

```json
{
  "success": true,
  "message": "API ist betriebsbereit",
  "timestamp": "2025-12-07T10:00:00.000Z"
}
```

## 🔧 Datenmodell

### Task-Objekt

```javascript
{
  id: string,              // Automatisch generierte eindeutige ID
  title: string,           // Titel der Aufgabe (erforderlich)
  description: string,     // Beschreibung der Aufgabe (erforderlich)
  completed: boolean,      // Status der Aufgabe (Standard: false)
  createdAt: string,       // ISO 8601 Zeitstempel der Erstellung
  updatedAt: string        // ISO 8601 Zeitstempel der letzten Aktualisierung
}
```

## 🛡️ Fehlerbehandlung

Die API verwendet eine zentrale Fehlerbehandlung mit strukturierten Fehlerantworten:

### Validierungsfehler (400)

```json
{
  "success": false,
  "error": "Titel ist erforderlich und muss ein nicht-leerer String sein"
}
```

### Nicht gefunden (404)

```json
{
  "success": false,
  "error": "Aufgabe mit ID xyz789 wurde nicht gefunden"
}
```

### Ungültiger Content-Type (415)

```json
{
  "success": false,
  "error": "Content-Type muss application/json sein"
}
```

### Serverfehler (500)

```json
{
  "success": false,
  "error": "Ein unerwarteter Fehler ist aufgetreten"
}
```

## 🧩 Architektur

### Model-Schicht

- `task.model.js`: Task-Datenmodell mit Eigenschaften und Methoden
- `task.repository.js`: In-Memory-Datenspeicher (Singleton) für CRUD-Operationen

### Service-Schicht

- `task.service.js`: Geschäftslogik und Validierung

### Controller-Schicht

- `task.controller.js`: HTTP-Request-Handling und Response-Formatierung

### Middleware

- `logger.middleware.js`: Request/Response-Logging
- `error.middleware.js`: Zentrale Fehlerbehandlung
- `validation.middleware.js`: Content-Type und Body-Validierung

## 📝 Validierungsregeln

### POST /api/tasks

- `title`: Erforderlich, nicht-leerer String
- `description`: Erforderlich, nicht-leerer String
- `completed`: Optional, Boolean (Standard: false)

### PUT /api/tasks/:id

- `title`: Optional, nicht-leerer String (wenn vorhanden)
- `description`: Optional, nicht-leerer String (wenn vorhanden)
- `completed`: Optional, Boolean

## 🧪 Testing mit cURL

```bash
# Alle Aufgaben abrufen
curl http://localhost:3000/api/tasks

# Neue Aufgabe erstellen
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Task\",\"description\":\"Test Description\"}"

# Aufgabe aktualisieren
curl -X PUT http://localhost:3000/api/tasks/abc123 \
  -H "Content-Type: application/json" \
  -d "{\"completed\":true}"

# Aufgabe löschen
curl -X DELETE http://localhost:3000/api/tasks/abc123
```

## 🔐 Best Practices

- ✅ ES6-Module statt CommonJS
- ✅ Async/Await für asynchrone Operationen
- ✅ Zentrale Fehlerbehandlung
- ✅ Klare Trennung der Verantwortlichkeiten (MVC)
- ✅ Input-Validierung
- ✅ RESTful API-Design
- ✅ Strukturierte JSON-Responses
- ✅ HTTP-Statuscodes korrekt verwendet
- ✅ Graceful Shutdown

## 📄 Lizenz

ISC

## 👤 Autor

Entwickelt als Übungsprojekt für Express.js REST-API-Entwicklung
