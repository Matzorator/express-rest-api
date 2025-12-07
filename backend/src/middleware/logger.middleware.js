/**
 * Logging Middleware
 * Protokolliert eingehende HTTP-Anfragen
 */

export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);

  // Protokolliere Response-Zeit
  const startTime = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    console.log(
      `[${timestamp}] ${method} ${url} - Status: ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};
