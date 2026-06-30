var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');

// =====================================================================
// PART 1: MISSING CSS — classes used by JS but no CSS defined
// =====================================================================

var missing = [
  '.pricelist{margin-top:0}',
  '.badge{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;font-size:14px;line-height:1;flex-shrink:0}',
  '.badge.blue{background:#dbeafe;color:#1e40af}',
  '.badge.green{background:#dcfce7;color:#15803d}',
  '.badge.purple{background:#f3e8ff;color:#6b21a8}',
  '.title-text{font-size:14px;font-weight:700;color:var(--text);margin-left:6px}',
  '.btn-sm{display:inline-flex;align-items:center;gap:4px;padding:5px 12px;font-size:12px;font-weight:600;border:1px solid var(--border);border-radius:8px;background:var(--card);color:var(--text-secondary);cursor:pointer;font-family:var(--font);transition:all .2s;white-space:nowrap}',
  '.btn-sm:hover{background:#f1f5f9;border-color:#94a3b8}',
  '.icon{font-size:24px;line-height:1}',
  '.divider{height:1px;background:linear-gradient(90deg,transparent,#cbd5e1,transparent);margin:12px 0}',
  '.sub{font-size:11px;color:#475569;margin:4px 0;line-height:1.5}',
  '.footer{font-size:11px;color:#64748b;margin-top:16px;padding-top:10px;border-top:1px solid #e2e8f0;text-align:center}',
];

// Insert before </style> so it's guaranteed to be in CSS block
tpl = tpl.replace('</style>', missing.join('\n') + '\n</style>');

// Add #globalSearch CSS (was missing)
tpl = tpl.replace('</style>',
  '#globalSearch{flex:1;padding:10px 16px;border:1.5px solid var(--border);border-radius:10px;font-size:13px;outline:none;font-family:var(--font);min-width:140px;color:var(--text);transition:all .2s;background:var(--card)}#globalSearch:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(37,99,235,.15)}#globalSearch::placeholder{color:#94a3b8}\n</style>'
);

// =====================================================================
// PART 2: VISUAL IMPROVEMENTS
// =====================================================================

// 2. Calc grid gap + border radius
tpl = tpl.replace('.calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:24px;background:#f8afc}', '.calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:24px;background:#f8afc}');

// 3. Calc result radius
tpl = tpl.replace('calc-result{background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1.5px solid #bbf7d0;border-radius:var(--radius);padding:20px;margin-top:0}',
  'calc-result{background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1.5px solid #bbf7d0;border-radius:var(--radius-lg);padding:20px;margin-top:0}');

// Wait - this didn't work before because it already said radius-lg. Let me check what's in the template
var m = tpl.match(/calc-result.*?calc-result h4/s);
console.log('Found calc-result block:');
console.log(m ? m[0].substring(0, 200) : 'NOT FOUND');

fs.writeFileSync('src/template.html', tpl, 'utf-8');
console.log('\nWritten. Size: ' + tpl.length + ' bytes');

var checks = [
  '.pricelist', '.badge{', '.badge.blue', '.badge.green', '.badge.purple',
  '.title-text', '.btn-sm{', '.btn-sm:hover', '.icon{', '.divider{', '.sub{', '.footer{',
  '#globalSearch{', '#globalSearch::placeholder'
];
var missing2 = [];
checks.forEach(function(x) { if (tpl.indexOf(x) < 0) missing2.push(x); });
if (missing2.length) { missing2.forEach(function(x) { console.log('✗ ' + x); }); }
else { console.log('✓ ALL CHECKS PASSED'); }
