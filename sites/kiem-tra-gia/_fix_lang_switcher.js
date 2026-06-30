var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');

// Add CSS for lang switcher before </style>
var css = '.lang-switcher{display:flex;gap:3px;background:rgba(255,255,255,.1);padding:3px;border-radius:8px;margin-left:8px}.lang-switcher a{display:inline-flex;padding:5px 10px;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;color:rgba(255,255,255,.7);transition:all .2s;cursor:pointer}.lang-switcher a.active{background:rgba(255,255,255,.2);color:#fff;pointer-events:none}.lang-switcher a:hover:not(.active){background:rgba(255,255,255,.15);color:#fff}';
tpl = tpl.replace('</style>', css + '\n</style>');

// Find the header right-side div (contains badges) and add lang switcher inside it
// Old: <span class="badge" id="dataInfo">📊 0 SP</span></div>
// New: <span class="badge" id="dataInfo">📊 0 SP</span>{{LANG_SWITCHER}}</div>
tpl = tpl.replace(
  '<span class="badge" id="dataInfo">📊 0 SP</span></div>',
  '<span class="badge" id="dataInfo">📊 0 SP</span>\n{{LANG_SWITCHER}}</div>'
);

fs.writeFileSync('src/template.html', tpl, 'utf-8');
console.log('Done');
