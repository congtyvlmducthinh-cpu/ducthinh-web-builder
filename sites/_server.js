// _server.js — Entry point for DoccheckWebServer Windows service
// Loads the full-featured canvas server with all routes (KTG, portal, doccheck).
var path = require('path');
// _server.js lives in:  ...\.openclaw\workspace-skills\web-builder\sites\
// canvas/server.js is:  ...\.openclaw\canvas\
// So we need ../../.. (3 levels up) then /canvas
var canvasServer = path.resolve(__dirname, '..', '..', '..', 'canvas', 'server.js');
try {
  require(canvasServer);
} catch(e) {
  console.error('[_server.js] Failed to load canvas server:', e.message);
  process.exit(1);
}
