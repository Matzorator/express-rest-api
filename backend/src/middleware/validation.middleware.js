/**
 * Request Validation Middleware
 * Validiert Content-Type und Request-Body
 */

export const validateJsonContent = (req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    const contentType = req.get("Content-Type");

    if (!contentType || !contentType.includes("application/json")) {
      return res.status(415).json({
        success: false,
        error: "Content-Type muss application/json sein",
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: "Request-Body darf nicht leer sein",
      });
    }
  }

  next();
};
