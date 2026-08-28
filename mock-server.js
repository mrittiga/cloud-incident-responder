const fs = require('fs');

const incidentLogs = `
[2026-08-28 17:00:01] INFO Server starting on port 8080...
[2026-08-28 17:00:05] ERROR DatabaseConnectionException: Failed to connect to DB at 127.0.0.1:5432
[2026-08-28 17:00:06] CRITICAL Memory threshold exceeded. Service shutting down.
`;

fs.writeFileSync('incident_log.txt', incidentLogs);
console.log('Incident logs generated in incident_log.txt');
