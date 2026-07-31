const fs = require('fs');

// Mojibake patterns: UTF-8 bytes shown as Latin-1 (Ã, â, Ÿ, º, ¹, ³, €, etc.)
const MOJI = /[Ã€Ã¡Ã¢Ã£ÄƒÄ‘ÃªÃ´Æ¡Æ°â€°â€˜â„¢â€œâ€�â€“â€”Ã¶Ã¼Å¸â€¡â€°â‚¬â€šâ€š]/;
const MOJI2 = /(â†º|âœ•|â€|Ã¡|Ã|º|Ÿ|â€š|â€°)/;

function scan(file) {
  const s = fs.readFileSync(file, 'utf8');
  const lines = s.split(/\r?\n/);
  const hits = [];
  lines.forEach((l, i) => {
    if (MOJI.test(l)) {
      // find the offending fragment
      const m = l.match(/[^\x00-\x7F]{2,30}/g) || [];
      hits.push({ line: i + 1, frags: m.slice(0, 6), text: l.trim().substring(0, 150) });
    }
  });
  return hits;
}

for (const f of ['sites/kiem-tra-gia/vi.html', 'sites/kiem-tra-gia/en.html', 'sites/kiem-tra-gia/zh.html']) {
  const hits = scan(f);
  console.log('===== ' + f + ' =====  ' + hits.length + ' lines with suspicious non-ASCII');
  // only print first 40 for vi (baseline), all for en/zh
  const limit = f.indexOf('vi.html') >= 0 ? 15 : 999;
  hits.slice(0, limit).forEach(h => console.log('  L' + h.line + ': ' + JSON.stringify(h.frags) + ' | ' + h.text));
}
