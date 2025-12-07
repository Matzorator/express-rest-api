/**
 * Express Application Setup
 * Konfiguriert die Express-Anwendung mit allen Middlewares und Routen
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { requestLogger } from "./middleware/logger.middleware.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";
import { validateJsonContent } from "./middleware/validation.middleware.js";
import { corsMiddleware } from "./middleware/cors.middleware.js";
import routes from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS Middleware (muss vor anderen Middlewares kommen)
app.use(corsMiddleware);

// Statische Dateien aus dem public-Ordner bereitstellen
app.use(express.static(path.join(__dirname, "../public")));

// Middleware für Request-Body-Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging Middleware
app.use(requestLogger);

// Validation Middleware für API-Routen
app.use("/api", validateJsonContent);

// API Routes
app.use("/api", routes);

// Root-Endpunkt für Web-App (HTML)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 404 Handler (muss vor dem Error Handler kommen)
app.use(notFoundHandler);

// Zentrale Fehlerbehandlung (muss als letztes kommen)
app.use(errorHandler);

export default app;
