# GitHub Repository Setup

## Repository auf GitHub erstellen

1. Gehe zu [GitHub](https://github.com/new)
2. Repository-Name: `express-rest-api`
3. Beschreibung: `REST-API für ein Aufgabenmanagement-System mit Express.js`
4. Wähle "Public" oder "Private"
5. **NICHT** "Initialize this repository with a README" anwählen (haben wir bereits)
6. Klicke auf "Create repository"

## Repository mit lokalem Code verknüpfen

Nach der Erstellung auf GitHub, führe folgende Befehle aus:

```bash
# Remote-Repository hinzufügen (ersetze USERNAME mit deinem GitHub-Username)
git remote add origin https://github.com/USERNAME/express-rest-api.git

# Branch umbenennen auf main (falls noch master)
git branch -M main

# Code auf GitHub pushen
git push -u origin main
```

## Alternative: GitHub CLI verwenden

Falls du die GitHub CLI installiert hast:

```bash
gh repo create express-rest-api --public --source=. --remote=origin --push
```

## Repository-Informationen

- **Projekt**: Express.js REST-API für Aufgabenmanagement
- **Technologie**: Node.js, Express.js
- **Architektur**: MVC (Model-View-Controller)
- **Features**: CRUD-Operationen, Fehlerbehandlung, Logging, Validierung
