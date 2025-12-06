/**
 * Task Routes
 * Definiert alle Endpunkte für die Task-API
 */

import express from "express";
import taskController from "../controllers/task.controller.js";

const router = express.Router();

/**
 * @route   GET /api/tasks
 * @desc    Liste aller Aufgaben abrufen
 * @access  Public
 */
router.get("/", taskController.getAllTasks);

/**
 * @route   GET /api/tasks/:id
 * @desc    Details einer bestimmten Aufgabe abrufen
 * @access  Public
 */
router.get("/:id", taskController.getTaskById);

/**
 * @route   POST /api/tasks
 * @desc    Neue Aufgabe erstellen
 * @access  Public
 */
router.post("/", taskController.createTask);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Bestehende Aufgabe aktualisieren
 * @access  Public
 */
router.put("/:id", taskController.updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Aufgabe löschen
 * @access  Public
 */
router.delete("/:id", taskController.deleteTask);

export default router;
