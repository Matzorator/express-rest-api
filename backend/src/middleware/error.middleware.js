/**
 * Error Handling Middleware
 * Zentrale Fehlerbehandlung für die gesamte Anwendung
 */

import { AppError } from "../utils/errors.js";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log für Entwicklung
  console.error("Error:", err);

  // Operationale Fehler (bekannte Fehler)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // Unbekannte Fehler
  res.status(500).json({
    success: false,
    error: "Ein unerwarteter Fehler ist aufgetreten",
    ...(process.env.NODE_ENV === "development" && {
      message: err.message,
      stack: err.stack,
    }),
  });
};

// 404 Handler
export const notFoundHandler = (req, res, next) => {
  const error = new AppError(`Route ${req.originalUrl} nicht gefunden`, 404);
  next(error);
};
