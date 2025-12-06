/**
 * Express Application Setup
 * Konfiguriert die Express-Anwendung mit allen Middlewares und Routen
 */

import express from "express";
import { requestLogger } from "./middleware/logger.middleware.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";
import { validateJsonContent } from "./middleware/validation.middleware.js";
import routes from "./routes/index.js";

const app = express();

// Middleware für Request-Body-Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging Middleware
app.use(requestLogger);

// Validation Middleware
app.use(validateJsonContent);

// API Routes
app.use("/api", routes);

// Root-Endpunkt
app.get("/", (req, res) => {
  res.json({
    message: "Willkommen zur Task Management REST-API",
    version: "1.0.0",
    endpoints: {
      tasks: "/api/tasks",
      health: "/api/health",
    },
  });
});

// 404 Handler (muss vor dem Error Handler kommen)
app.use(notFoundHandler);

// Zentrale Fehlerbehandlung (muss als letztes kommen)
app.use(errorHandler);

export default app;
