var fs = require('fs');
var path = require('path');

// ─── KTG Data Store ──────────────────────────────────────────────────────

var KTG_DATA_DIR = 'C:/Users/Admin/.openclaw/canvas/ktg-data';

// ktgData[lang] = { DATA_PRODUCTS: 'var DATA_PRODUCTS = [...];', ... }
var ktgData = {};

function loadKtgData() {
  ['vi', 'en', 'zh'].forEach(function(lang) {
    var fp = path.join(KTG_DATA_DIR, lang + '.json');
    try {
      if (fs.existsSync(fp)) {
        ktgData[lang] = JSON.parse(fs.readFileSync(fp, 'utf-8'));
        console.log('[KTG] Loaded saved data for ' + lang);
      } else {
        ktgData[lang] = {};
        console.log('[KTG] No saved data for ' + lang + ', will use defaults');
      }
    } catch(e) {
      ktgData[lang] = {};
      console.log('[KTG] Error loading data for ' + lang + ': ' + e.message);
    }
  });
}

function saveKtgData(lang, dataBlocks) {
  if (!ktgData[lang]) ktgData[lang] = {};
  Object.keys(dataBlocks).forEach(function(k) { ktgData[lang][k] = dataBlocks[k]; });
  var fp = path.join(KTG_DATA_DIR, lang + '.json');
  fs.writeFileSync(fp, JSON.stringify(ktgData[lang], null, 2), 'utf-8');
  console.log('[KTG] Saved ' + Object.keys(dataBlocks).length + ' blocks for ' + lang);
}

function injectKtgData(html, lang) {
  var saved = ktgData[lang];
  if (!saved) return html;
  
  // Process in order: DATA_PRODUCTS first (longest), then DATA_BAGS, DATA_OTHERS, etc.
  var vars = ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING', 'DATA_COST_FOB'];
  vars.forEach(function(v) {
    if (saved[v]) {
      // Build regex from the original DEFAULT representation to match what's in HTML
      // Each saved[v] is like: "var DATA_PRODUCTS = [...]" (the full original string)
      
      // Find the var declaration in html and replace it
      var idx = html.indexOf('var ' + v + ' = ');
      if (idx >= 0) {
        var before = html.substring(0, idx);
        var after;
        if (saved[v].match(/=\s*\{/)) {
          // Object - find matching }; 
          var end = html.indexOf('};', idx);
          after = html.substring(end + 2);
        } else {
          // Array - find ];
          var end = html.indexOf('];', idx);
          after = html.substring(end + 2);
        }
        html = before + saved[v] + after;
      }
    }
  });
  
  return html;
}

// Auto-load at startup
loadKtgData();

// Export for use in server.js
module.exports = {
  injectKtgData: injectKtgData,
  saveKtgData: saveKtgData,
  getData: function(lang) { return ktgData[lang] || {}; }
};
