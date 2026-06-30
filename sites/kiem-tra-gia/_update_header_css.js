const fs = require('fs');
let tpl = fs.readFileSync('src/template.html', 'utf-8');

// 1. Improve header CSS
const headerCSS = `header{background:linear-gradient(135deg,#0f1b3d,#1a3a8a,#1a56db);color:#fff;border-radius:var(--radius-lg);padding:20px 24px;margin-bottom:16px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;box-shadow:0 4px 20px rgba(26,86,219,.25);position:relative;overflow:hidden}
header h1{font-size:20px;font-weight:800;letter-spacing:-.5px;z-index:1;position:relative;display:flex;align-items:center;gap:6px}
header h1 span{color:#60a5fa;font-size:18px}
header .sub{font-size:12px;opacity:.85;margin-top:2px}
header .badge{background:rgba(255,255,255,.1);backdrop-filter:blur(8px);padding:5px 14px;border-radius:20px;font-size:11px;font-weight:600;z-index:1;position:relative}`;

tpl = tpl.replace(/header\{background:linear-gradient[^}]+\}\s*header h1[^}]+\}\s*header h1 span[^}]+\}\s*header \.badge[^}]+\}/, headerCSS);

// 2. Add market-group CSS near other btn-sm/Pricelist CSS
const marketCSS = `
.market-group{display:inline-flex;gap:3px;align-items:center;margin-left:8px}
.market-group .btn-sm{background:var(--card);border:1px solid var(--border);padding:4px 10px;font-size:11px;font-weight:600;border-radius:6px;cursor:pointer;transition:all .15s ease;color:var(--text-secondary)}
.market-group .btn-sm.active{background:#1a56db;color:#fff;border-color:#1a56db}
.market-group .btn-sm:hover:not(.active){background:#f1f5f9;border-color:#94a3b8}`;

// Insert after .btn-sm:hover CSS
const btnSmEnd = tpl.indexOf('}') + 1;
tpl = tpl.substring(0, btnSmEnd) + marketCSS + tpl.substring(btnSmEnd);

fs.writeFileSync('src/template.html', tpl, 'utf-8');
console.log('✅ Updated header CSS and added market-group CSS to template');
