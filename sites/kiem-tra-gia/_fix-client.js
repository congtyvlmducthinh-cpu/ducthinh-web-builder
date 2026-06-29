const fs = require('fs');
const path = require('path');
const file = 'C:\\Users\\Admin\\.openclaw\\workspace-skills\\web-builder\\sites\\kiem-tra-gia\\vi.html';
let c = fs.readFileSync(file, 'utf-8');

// === ADD 1: After render() in handleManageFile (after line with "✅ Đã cập nhật"), add saveToServer call ===
// Find: status.textContent = "✅ Đã cập nhật " + updated + " bảng dữ liệu!";
const okLine = 'status.textContent = "✅ Đã cập nhật " + updated + " bảng dữ liệu!";';
const okIdx = c.indexOf(okLine);
if (okIdx === -1) { console.log('OK line not found'); process.exit(1); }

// Insert saveToServer call BEFORE the okLine
const insertPoint = okIdx;
const saveCall = `      saveToServer();
      `;
c = c.substring(0, insertPoint) + saveCall + c.substring(insertPoint);

// === ADD 2: saveToServer function right after the importCostFOB function ===
// Find: importCostFOB's closing brace followed by // ====== PASSWORD MODAL
const pwModal = '// ====== PASSWORD MODAL';
const pwIdx = c.indexOf(pwModal);
if (pwIdx === -1) { console.log('PASSWORD MODAL not found at expected pos'); process.exit(1); }

const saveToServerFunc = `
function saveToServer() {
  var blocks = {};
  blocks.DATA_PRODUCTS = 'var DATA_PRODUCTS = ' + JSON.stringify(DATA_PRODUCTS, null, 2) + ';';
  blocks.DATA_BAGS = 'var DATA_BAGS = ' + JSON.stringify(DATA_BAGS, null, 2) + ';';
  blocks.DATA_OTHERS = 'var DATA_OTHERS = ' + JSON.stringify(DATA_OTHERS, null, 2) + ';';
  blocks.DATA_MAX_LOADING = 'var DATA_MAX_LOADING = ' + JSON.stringify(DATA_MAX_LOADING, null, 2) + ';';
  blocks.DATA_COST_FOB = 'var DATA_COST_FOB = ' + JSON.stringify(DATA_COST_FOB, null, 2) + ';';
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/ktg-data', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('[KTG] Saved to server');
    } else {
      console.error('[KTG] Server save failed:', xhr.status);
    }
  };
  xhr.onerror = function() { console.error('[KTG] Server save network error'); };
  xhr.send(JSON.stringify({ blocks: blocks }));
}
`;

c = c.substring(0, pwIdx) + saveToServerFunc + c.substring(pwIdx);

// === ADD 3: Remove localStorage-based loading (lines that override server-injected data) ===
// Those lines start with: var saved = localStorage.getItem("dq_products");
// We'll comment them out so server-injected data takes precedence
const savedLine1 = 'var saved = localStorage.getItem("dq_products");';
const savedIdx1 = c.indexOf(savedLine1);
if (savedIdx1 === -1) { console.log('saved line 1 not found'); process.exit(1); }

// Find the end of all saved/localStorage blocks: it ends where `applyMarket();` is
const applyMarketLine = 'applyMarket();';
const applyMarketIdx = c.indexOf(applyMarketLine, savedIdx1);
if (applyMarketIdx === -1) { console.log('applyMarket not found'); process.exit(1); }

const localStorageBlock = c.substring(savedIdx1, applyMarketIdx + applyMarketLine.length);
const commentedBlock = '/* ' + localStorageBlock.replace(/\*\//g, '* /') + ' */\n';
c = c.substring(0, savedIdx1) + commentedBlock + c.substring(applyMarketIdx + applyMarketLine.length);

// // But we still want localStorage as fallback if server didn't inject
// Actually, we commented it all out. Let's replace with a smarter approach:
// After server injects, if blocks are present (value exists), use them. 
// If not (e.g. served from file directly without server), fall back to localStorage.
// For now this is fine since we know server injects.

fs.writeFileSync(file, c, 'utf-8');
console.log('✓ Client HTML fixed');

// Quick verify the file still makes sense
console.log('\nSaved line at:', savedIdx1, '→ commented out');
console.log('OK line at:', okIdx, '→ saveToServer() inserted before it');
