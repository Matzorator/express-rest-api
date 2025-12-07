/**
 * Task Controller
 * Handhabt HTTP-Anfragen für Aufgaben
 */

import taskService from "../services/task.service.js";

class TaskController {
  async getAllTasks(req, res, next) {
    try {
      const tasks = taskService.getAllTasks();
      res.json({
        success: true,
        data: tasks,
        count: tasks.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const task = taskService.getTaskById(req.params.id);
      res.json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  async createTask(req, res, next) {
    try {
      const task = taskService.createTask(req.body);
      res.status(201).json({
        success: true,
        data: task,
        message: "Aufgabe erfolgreich erstellt",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const task = taskService.updateTask(req.params.id, req.body);
      res.json({
        success: true,
        data: task,
        message: "Aufgabe erfolgreich aktualisiert",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      taskService.deleteTask(req.params.id);
      res.json({
        success: true,
        message: "Aufgabe erfolgreich gelöscht",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
