/**
 * Task Model
 * Repräsentiert die Datenstruktur für eine Aufgabe
 */

class Task {
  constructor(title, description, completed = false) {
    this.id = this.generateId();
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  update(data) {
    if (data.title !== undefined) this.title = data.title;
    if (data.description !== undefined) this.description = data.description;
    if (data.completed !== undefined) this.completed = data.completed;
    this.updatedAt = new Date().toISOString();
  }
}

export default Task;
