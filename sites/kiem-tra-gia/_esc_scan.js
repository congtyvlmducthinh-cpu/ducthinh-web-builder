const fs = require('fs');

const VN_RE = /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;

// Decode \uXXXX escapes inside a string (also \uD83D\uDC48 surrogate pairs)
function decodeEscapes(s) {
  return s.replace(/\\u([0-9a-fA-F]{4})/g, (m, h) => String.fromCharCode(parseInt(h, 16)));
}

function scan(file) {
  const s = fs.readFileSync(file, 'utf8');
  const lines = s.split(/\r?\n/);
  const hits = [];
  lines.forEach((l, i) => {
    if (l.indexOf('\\u') < 0) return;
    const decoded = decodeEscapes(l);
    if (VN_RE.test(decoded)) {
      // show the decoded text fragment
      const m = decoded.match(/[^\x00-\x7F]{2,60}/g) || [];
      hits.push({ line: i + 1, frags: m.slice(0, 8), text: l.trim().substring(0, 150) });
    }
  });
  return hits;
}

for (const f of ['sites/kiem-tra-gia/en.html', 'sites/kiem-tra-gia/zh.html']) {
  console.log('########## ' + f + ' ##########');
  const hits = scan(f);
  console.log(hits.length + ' lines with Vietnamese \\u escapes');
  hits.forEach(h => console.log('  L' + h.line + ' ' + JSON.stringify(h.frags) + ' | ' + h.text));
}
