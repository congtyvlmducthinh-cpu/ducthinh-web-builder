const fs = require('fs');
for (const f of ['sites/kiem-tra-gia/en.html', 'sites/kiem-tra-gia/zh.html']) {
  const s = fs.readFileSync(f, 'utf8');
  const lines = s.split(/\r?\n/);
  console.log('########## ' + f + ' ##########');
  lines.forEach((l, i) => {
    if (/fobptsc-|VNĐ|VN\u0110|ng\u00e0y|ng\u00e0y|FOB PTSC|fobPtsc/.test(l) && i < 700) {
      console.log((i + 1) + ': ' + l.trim().substring(0, 180));
    }
  });
  console.log('--- fobPtscSetCurrency + labels ---');
  lines.forEach((l, i) => {
    if (/fobCcyLbl|fobPtscSetCurrency|data-fobccy/.test(l)) console.log((i + 1) + ': ' + l.trim().substring(0, 180));
  });
}
