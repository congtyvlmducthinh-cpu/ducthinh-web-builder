/*
 * Build script for DocCheck
 * Generates index.html from template + i18n JSON files
 * Usage: node build.js
 */
const fs = require("fs");
const path = require("path");

const SRC = __dirname;
const OUT = path.join(SRC, "index.html");
const I18N_DIR = path.join(SRC, "i18n");
const CANVAS = "C:\\Users\\Admin\\.openclaw\\canvas\\doccheck.html";

// Read template
let html = fs.readFileSync(path.join(SRC, "template.html"), "utf-8");

// Read i18n files
const vi = JSON.parse(fs.readFileSync(path.join(I18N_DIR, "vi.json"), "utf-8"));
const en = JSON.parse(fs.readFileSync(path.join(I18N_DIR, "en.json"), "utf-8"));
const zh = JSON.parse(fs.readFileSync(path.join(I18N_DIR, "zh.json"), "utf-8"));

// Build I18N dict JS
const dictJs = JSON.stringify({ vi, en, zh }, null, 2);

// Inject into template (replace {{I18N_DICT}})
html = html.replace("{{I18N_DICT}}", dictJs);

// Replace any remaining {{KEY}} placeholders with vi (default) values
html = html.replace(/\{\{(\w+(?:\.\w+)*)\}\}/g, (match, key) => {
  return vi[key] !== undefined ? vi[key] : match;
});

// Write output
fs.writeFileSync(OUT, html, "utf-8");
const stats = fs.statSync(OUT);
console.log("✓ Built: " + OUT + " (" + stats.size + " bytes)");

// Deploy to canvas
fs.writeFileSync(CANVAS, html, "utf-8");
console.log("✓ Deployed: " + CANVAS + " (" + fs.statSync(CANVAS).size + " bytes)");
