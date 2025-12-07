/**
 * CORS Middleware
 * Ermöglicht Cross-Origin Resource Sharing
 */

export const corsMiddleware = (req, res, next) => {
  // Erlaube Anfragen von allen Origins (für Entwicklung)
  res.header("Access-Control-Allow-Origin", "*");

  // Erlaube spezifische HTTP-Methoden
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // Erlaube spezifische Headers
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Für Preflight-Anfragen
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
};
