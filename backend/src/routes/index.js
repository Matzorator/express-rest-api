/**
 * Main Router
 * Zentrales Routing für alle API-Endpunkte
 */

import express from "express";
import taskRoutes from "./task.routes.js";

const router = express.Router();

// Task-Routen
router.use("/tasks", taskRoutes);

// Health-Check-Endpunkt
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API ist betriebsbereit",
    timestamp: new Date().toISOString(),
  });
});

export default router;
