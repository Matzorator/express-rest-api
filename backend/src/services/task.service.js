/**
 * Task Service
 * Geschäftslogik für Aufgabenverwaltung
 */

import taskRepository from "../models/task.repository.js";
import { ValidationError, NotFoundError } from "../utils/errors.js";

class TaskService {
  getAllTasks() {
    return taskRepository.findAll();
  }

  getTaskById(id) {
    const task = taskRepository.findById(id);
    if (!task) {
      throw new NotFoundError(`Aufgabe mit ID ${id} wurde nicht gefunden`);
    }
    return task;
  }

  createTask(taskData) {
    this.validateTaskData(taskData, true);
    return taskRepository.create(taskData);
  }

  updateTask(id, taskData) {
    this.validateTaskData(taskData, false);
    const task = taskRepository.update(id, taskData);
    if (!task) {
      throw new NotFoundError(`Aufgabe mit ID ${id} wurde nicht gefunden`);
    }
    return task;
  }

  deleteTask(id) {
    const deleted = taskRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError(`Aufgabe mit ID ${id} wurde nicht gefunden`);
    }
    return true;
  }

  validateTaskData(data, isCreate) {
    if (isCreate) {
      if (
        !data.title ||
        typeof data.title !== "string" ||
        data.title.trim() === ""
      ) {
        throw new ValidationError(
          "Titel ist erforderlich und muss ein nicht-leerer String sein"
        );
      }
      if (
        !data.description ||
        typeof data.description !== "string" ||
        data.description.trim() === ""
      ) {
        throw new ValidationError(
          "Beschreibung ist erforderlich und muss ein nicht-leerer String sein"
        );
      }
    } else {
      if (
        data.title !== undefined &&
        (typeof data.title !== "string" || data.title.trim() === "")
      ) {
        throw new ValidationError("Titel muss ein nicht-leerer String sein");
      }
      if (
        data.description !== undefined &&
        (typeof data.description !== "string" || data.description.trim() === "")
      ) {
        throw new ValidationError(
          "Beschreibung muss ein nicht-leerer String sein"
        );
      }
    }

    if (data.completed !== undefined && typeof data.completed !== "boolean") {
      throw new ValidationError("Completed muss ein Boolean-Wert sein");
    }
  }
}

export default new TaskService();
