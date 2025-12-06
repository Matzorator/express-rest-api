# API Test-Beispiele (PowerShell)

## Server starten

```powershell
npm start
# oder für Entwicklung mit Auto-Reload:
npm run dev
```

## API-Tests

### 1. Health Check

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/health" -Method GET | Select-Object -ExpandProperty Content
```

### 2. Alle Aufgaben abrufen

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/tasks" -Method GET | Select-Object -ExpandProperty Content
```

### 3. Neue Aufgabe erstellen

```powershell
$body = @{
    title = "Neue Aufgabe"
    description = "Beschreibung der neuen Aufgabe"
    completed = $false
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/tasks" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body | Select-Object -ExpandProperty Content
```

### 4. Einzelne Aufgabe abrufen (ersetze ID)

```powershell
$taskId = "TASK_ID_HIER_EINFÜGEN"
Invoke-WebRequest -Uri "http://localhost:3000/api/tasks/$taskId" -Method GET | Select-Object -ExpandProperty Content
```

### 5. Aufgabe aktualisieren (ersetze ID)

```powershell
$taskId = "TASK_ID_HIER_EINFÜGEN"
$body = @{
    title = "Aktualisierter Titel"
    completed = $true
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/tasks/$taskId" `
    -Method PUT `
    -ContentType "application/json" `
    -Body $body | Select-Object -ExpandProperty Content
```

### 6. Aufgabe löschen (ersetze ID)

```powershell
$taskId = "TASK_ID_HIER_EINFÜGEN"
Invoke-WebRequest -Uri "http://localhost:3000/api/tasks/$taskId" -Method DELETE | Select-Object -ExpandProperty Content
```

## Vollständiger Test-Workflow

```powershell
# 1. Alle Aufgaben anzeigen
Write-Host "`n=== Alle Aufgaben ===" -ForegroundColor Cyan
$tasks = (Invoke-WebRequest -Uri "http://localhost:3000/api/tasks" -Method GET).Content | ConvertFrom-Json
$tasks.data | Format-Table id, title, completed

# 2. Neue Aufgabe erstellen
Write-Host "`n=== Neue Aufgabe erstellen ===" -ForegroundColor Cyan
$newTask = @{
    title = "Test Aufgabe"
    description = "Dies ist eine Test-Aufgabe"
    completed = $false
} | ConvertTo-Json

$created = (Invoke-WebRequest -Uri "http://localhost:3000/api/tasks" -Method POST -ContentType "application/json" -Body $newTask).Content | ConvertFrom-Json
$taskId = $created.data.id
Write-Host "Erstellt mit ID: $taskId" -ForegroundColor Green

# 3. Aufgabe aktualisieren
Write-Host "`n=== Aufgabe aktualisieren ===" -ForegroundColor Cyan
$update = @{
    completed = $true
} | ConvertTo-Json

$updated = (Invoke-WebRequest -Uri "http://localhost:3000/api/tasks/$taskId" -Method PUT -ContentType "application/json" -Body $update).Content | ConvertFrom-Json
Write-Host "Status: $($updated.data.completed)" -ForegroundColor Green

# 4. Aufgabe löschen
Write-Host "`n=== Aufgabe löschen ===" -ForegroundColor Cyan
$deleted = (Invoke-WebRequest -Uri "http://localhost:3000/api/tasks/$taskId" -Method DELETE).Content | ConvertFrom-Json
Write-Host $deleted.message -ForegroundColor Green
```

## Browser-Test

Öffne folgende URLs im Browser:

- http://localhost:3000
- http://localhost:3000/api/health
- http://localhost:3000/api/tasks

## Mit Postman oder Insomnia testen

1. Importiere die Endpunkte:

   - GET http://localhost:3000/api/tasks
   - GET http://localhost:3000/api/tasks/:id
   - POST http://localhost:3000/api/tasks
   - PUT http://localhost:3000/api/tasks/:id
   - DELETE http://localhost:3000/api/tasks/:id

2. Für POST/PUT: Content-Type Header auf `application/json` setzen
