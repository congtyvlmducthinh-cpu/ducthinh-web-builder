var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');

// =====================================================================
// 1. Google Fonts — insert after </title>
// =====================================================================
tpl = tpl.replace(
  '</title>',
  '</title>\n' +
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">'
);

// =====================================================================
// 2. All missing CSS blocks — insert before the media query
// =====================================================================
var newCSS = [
  // --- Summary bar ---
  '.summary-bar{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px}',
  '.summary-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:12px 18px;text-align:center;flex:1;min-width:120px;box-shadow:var(--shadow)}',
  '.summary-card .lbl{font-size:10px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);font-weight:600;margin-bottom:2px}',
  '.summary-card .val{font-size:16px;font-weight:800;color:var(--primary)}',
  '.info-row{font-size:10px;color:var(--muted);font-weight:400;display:block;margin-top:1px}',
  '.ml-toggle{transition:opacity .2s}',
  // --- Calc form ---
  '.calc-form-group{margin-bottom:12px}',
  '.calc-form-label{display:block;font-size:11px;font-weight:700;margin-bottom:5px;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.04em}',
  '.calc-select{width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:10px;font-size:14px;background:var(--card);outline:none;transition:all .2s;font-family:var(--font);color:var(--text)}',
  '.calc-row-inline{display:flex;gap:10px}',
  '.calc-row-inline>div{flex:1}',
  '.calc-currency-bar{display:flex;gap:8px;align-items:center;margin-bottom:12px;padding:8px 12px;background:#f8fafc;border-radius:var(--radius-sm)}',
  '.calc-empty-icon{font-size:36px;margin-bottom:8px;line-height:1}',
  '.calc-empty-text{color:var(--muted);font-size:13px}',
  '.calc-section-title{font-size:14px;font-weight:700;color:var(--text);margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid var(--border)}',
  '.calc-result-summary{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;margin-bottom:12px;box-shadow:var(--shadow)}',
  '.calc-result-item{display:flex;justify-content:space-between;padding:6px 0;font-size:13px;border-bottom:1px solid #f1f5f9}',
  '.calc-result-item:last-child{border-bottom:none}',
  '.calc-rl{color:var(--text-secondary);font-weight:500}',
  '.calc-rv{font-weight:700;color:var(--text);text-align:right}',
  '.calc-result-total-row{display:flex;justify-content:space-between;padding:10px 0 0;margin-top:8px;border-top:2px solid var(--primary);font-size:15px;font-weight:800;color:var(--primary)}',
  '.calc-commission-wrap{margin-top:12px;background:var(--card);border-radius:var(--radius);border:1px solid var(--border);overflow:hidden}',
  '.calc-comm-result{padding:14px 16px;background:#fffbeb;border-bottom:1px solid #fde68a}',
  '.calc-comm-row{display:flex;justify-content:space-between;padding:10px 16px;font-size:13px;border-bottom:1px solid #f1f5f9}',
  '.calc-comm-row:last-child{border-bottom:none;font-weight:800;color:var(--green)}',
  '.calc-sell-input{width:120px;padding:6px 10px;border:1.5px solid var(--border);border-radius:18px;font-size:13px;text-align:right;outline:none;font-family:var(--font);color:var(--text);font-weight:600}',
  '.calc-total{font-size:18px;font-weight:800;color:var(--primary)}',
  '.calc-right-header{padding-bottom:0}',
  '.calc-right-header h3{font-size:15px;margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid var(--primary);color:var(--primary);font-weight:700}',
  // --- Freight popup ---
  '.freight-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,.6);backdrop-filter:blur(4px);display:none;justify-content:center;align-items:center;z-index:2000}',
  '.freight-overlay.open{display:flex}',
  '.freight-modal{background:var(--card);border-radius:var(--radius-lg);max-width:720px;width:95%;max-height:85vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.15)}',
  '.freight-modal-header{display:flex;justify-content:space-between;align-items:center;padding:18px 24px;border-bottom:1px solid var(--border)}',
  '.freight-modal-header h3{font-size:16px;font-weight:700}',
  '.freight-modal-close{background:none;border:none;font-size:22px;cursor:pointer;color:var(--muted)}',
  '.freight-modal-filters{display:flex;gap:8px;padding:12px 16px;flex-wrap:wrap}',
  '.freight-modal-filters select{flex:1;min-width:120px;padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;font-size:13px;outline:none;font-family:var(--font);color:var(--text);background:var(--card)}',
  '.freight-modal-body{flex:1;overflow-y:auto;padding:0 16px 16px;max-height:50vh}',
  '.freight-modal-body table{width:100%;border-collapse:collapse;font-size:13px}',
  '.freight-modal-body th{padding:8px 10px;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);background:#f8fafc;position:sticky;top:0;z-index:1;text-align:left;border-bottom:1px solid var(--border)}',
  '.freight-modal-body td{padding:8px 10px;border-bottom:1px solid #f1f5f9}',
  '.freight-modal-body tbody tr:hover td{background:#eff6ff}',
  '.freight-modal-body tbody tr.selected td{background:#dbeafe;font-weight:600}',
  '.freight-val{font-weight:700;color:var(--primary)}',
  '.freight-modal-footer{display:flex;justify-content:flex-end;align-items:center;gap:8px;padding:14px 24px;border-top:1px solid var(--border)}',
];

// Insert before the media query
var oldMedia = '@media(max-width:768px){body{padding:12px}.calc-grid{grid-template-columns:1fr}.q-modal-form{grid-template-columns:1fr}}';
tpl = tpl.replace(oldMedia, newCSS.join('\n') + '\n' + oldMedia);

// =====================================================================
// 3. Expand the media query with responsive rules
// =====================================================================
var newMediaDetails = '.summary-bar{flex-direction:column;gap:6px}.summary-card{padding:10px 14px}.calc-row-inline{flex-direction:column;gap:6px}';
tpl = tpl.replace(oldMedia, oldMedia.replace('}}', newMediaDetails + '}}'));

fs.writeFileSync('src/template.html', tpl, 'utf-8');
console.log('Written. Size: ' + tpl.length + ' bytes');

// Verify all critical entries
var critical = [
  ['Google Fonts link', 'fonts.googleapis.com'],
  ['Inter font loaded', 'Inter'],
  ['.summary-bar', '.summary-bar{'],
  ['.summary-card', '.summary-card{'],
  ['.info-row', '.info-row{'],
  ['.ml-toggle', '.ml-toggle{'],
  ['.calc-form-group', '.calc-form-group{'],
  ['.calc-form-label', '.calc-form-label{'],
  ['.calc-select', '.calc-select{'],
  ['.calc-row-inline', '.calc-row-inline{'],
  ['.calc-currency-bar', '.calc-currency-bar{'],
  ['.calc-empty-icon', '.calc-empty-icon{'],
  ['.calc-empty-text', '.calc-empty-text{'],
  ['.calc-section-title', '.calc-section-title{'],
  ['.calc-result-summary', '.calc-result-summary{'],
  ['.calc-result-item', '.calc-result-item{'],
  ['.calc-rl', '.calc-rl{'],
  ['.calc-rv', '.calc-rv{'],
  ['.calc-result-total-row', '.calc-result-total-row{'],
  ['.calc-commission-wrap', '.calc-commission-wrap{'],
  ['.calc-comm-result', '.calc-comm-result{'],
  ['.calc-comm-row', '.calc-comm-row{'],
  ['.calc-sell-input', '.calc-sell-input{'],
  ['.calc-total', '.calc-total{'],
  ['.calc-right-header', '.calc-right-header{'],
  ['.freight-overlay', '.freight-overlay{'],
  ['.freight-overlay.open', '.freight-overlay.open{'],
  ['.freight-modal', '.freight-modal{'],
  ['.freight-modal-header', '.freight-modal-header{'],
  ['.freight-modal-filters', '.freight-modal-filters{'],
  ['.freight-modal-body', '.freight-modal-body{'],
  ['.freight-val', '.freight-val{'],
  ['.freight-modal-footer', '.freight-modal-footer{'],
  ['Media query responsive', '.calc-row-inline{flex-direction:column;gap:6px}'],
  ['HTML freightSearch input', 'id="freightSearch"'],
  ['Template marker', '{{JS_INLINE}}'],
  ['Footer', '</html>'],
];

var allOk = true;
critical.forEach(function(pair) {
  var found = tpl.indexOf(pair[1]) >= 0;
  if (!found) { console.log('MISS ' + pair[0]); allOk = false; }
});
if (allOk) console.log('ALL ' + critical.length + ' CHECKS PASSED ✓');
