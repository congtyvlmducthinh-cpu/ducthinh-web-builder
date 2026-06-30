var fs = require('fs');

var template = fs.readFileSync('src/template.html', 'utf8');

// Add CSS for reset filters button before </style>
template = template.replace(
  '#globalSearch{flex:1;padding:10px 16px;border:1.5px solid var(--border);border-radius:10px;font-size:13px;outline:none;font-family:var(--font);min-width:140px;color:var(--text);transition:all .2s;background:var(--card)}#globalSearch:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(37,99,235,.15)}#globalSearch::placeholder{color:#94a3b8}',
  '#globalSearch{flex:1;padding:10px 16px;border:1.5px solid var(--border);border-radius:10px;font-size:13px;outline:none;font-family:var(--font);min-width:140px;color:var(--text);transition:all .2s;background:var(--card)}#globalSearch:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(37,99,235,.15)}#globalSearch::placeholder{color:#94a3b8}#resetFiltersBtn{width:34px;height:34px;padding:0;border:1.5px solid var(--border);border-radius:8px;background:var(--card);color:var(--text-secondary);font-size:16px;line-height:1;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s}#resetFiltersBtn:hover{background:#f1f5f9;border-color:#94a3b8;color:var(--text)}'
);

fs.writeFileSync('src/template.html', template, 'utf8');
console.log('Updated template.html CSS');
