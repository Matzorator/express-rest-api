/**
 * Server Entry Point
 * Startet den Express-Server
 */

import app from "./app.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const server = app.listen(PORT, HOST, () => {
  console.log("=".repeat(50));
  console.log("🚀 Task Management REST-API Server gestartet");
  console.log("=".repeat(50));
  console.log(`📍 Server läuft auf: http://${HOST}:${PORT}`);
  console.log(`📚 API Endpunkte: http://${HOST}:${PORT}/api`);
  console.log(`✅ Health Check: http://${HOST}:${PORT}/api/health`);
  console.log("=".repeat(50));
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal empfangen: Server wird heruntergefahren...");
  server.close(() => {
    console.log("Server wurde erfolgreich heruntergefahren");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("\nSIGINT signal empfangen: Server wird heruntergefahren...");
  server.close(() => {
    console.log("Server wurde erfolgreich heruntergefahren");
    process.exit(0);
  });
});
