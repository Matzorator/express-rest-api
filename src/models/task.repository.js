/**
 * Task Repository
 * In-Memory-Datenquelle für Aufgaben
 */

import Task from "./task.model.js";

class TaskRepository {
  constructor() {
    this.tasks = [];
    this.initializeSampleData();
  }

  initializeSampleData() {
    this.tasks.push(
      new Task("Projekt Setup", "Express.js REST-API einrichten", false)
    );
    this.tasks.push(
      new Task(
        "Dokumentation schreiben",
        "README und API-Dokumentation erstellen",
        false
      )
    );
    this.tasks.push(
      new Task(
        "Tests implementieren",
        "Unit-Tests für alle Endpunkte schreiben",
        false
      )
    );
  }

  findAll() {
    return this.tasks;
  }

  findById(id) {
    return this.tasks.find((task) => task.id === id);
  }

  create(taskData) {
    const task = new Task(
      taskData.title,
      taskData.description,
      taskData.completed
    );
    this.tasks.push(task);
    return task;
  }

  update(id, taskData) {
    const task = this.findById(id);
    if (!task) {
      return null;
    }
    task.update(taskData);
    return task;
  }

  delete(id) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return false;
    }
    this.tasks.splice(index, 1);
    return true;
  }
}

// Singleton-Instanz
const taskRepository = new TaskRepository();

export default taskRepository;
