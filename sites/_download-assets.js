const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIR = path.resolve('C:', 'Users', 'Admin', '.openclaw', 'canvas', 'static');
const FDIR = path.join(DIR, 'fonts');
const JSDIR = path.join(DIR, 'js');
fs.mkdirSync(FDIR, { recursive: true });
fs.mkdirSync(JSDIR, { recursive: true });

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function fetch(u, n) {
  n = n || 0;
  if (n > 5) throw new Error('Too many redirects: ' + u);
  return new Promise((resolve, reject) => {
    const url = new URL(u);
    const mod = u.startsWith('https') ? https : http;
    const opt = { hostname: url.hostname, path: url.pathname + url.search, headers: { 'User-Agent': UA } };
    if (url.port) opt.port = url.port;
    mod.get(opt, (res) => {
      if (res.statusCode >= 301 && res.statusCode <= 308 && res.headers.location) {
        const loc = res.headers.location;
        const next = loc.startsWith('http') ? loc : (url.protocol + '//' + url.host + loc);
        console.log('  -> ' + (next.length > 80 ? next.substring(0,80)+'...' : next));
        fetch(next, n+1).then(resolve).catch(reject);
        return;
      }
      let d = [];
      res.on('data', c => d.push(c));
      res.on('end', () => resolve({ status: res.statusCode, data: Buffer.concat(d) }));
    }).on('error', reject);
  });
}

async function main() {
  console.log('=== Step 1: Lucide ===');
  try {
    const r = await fetch('https://unpkg.com/lucide@1.21.0/dist/umd/lucide.min.js');
    console.log('Status:', r.status, 'Size:', r.data.length);
    fs.writeFileSync(path.join(JSDIR, 'lucide.min.js'), r.data);
    console.log('OK lucide.min.js');
  } catch(e) { console.error('FAIL:', e.message); }

  console.log('\n=== Step 2: Google Fonts CSS ===');
  try {
    const cssUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap';
    const r = await fetch(cssUrl);
    console.log('Status:', r.status, 'Size:', r.data.length);
    const css = r.data.toString('utf-8');
    console.log('Sample:', css.substring(0, 300));
    
    const blocks = css.split('@font-face').filter(b => b.includes('font-family'));
    console.log('Blocks:', blocks.length);
    
    const cssOut = [];
    let total = 0;
    
    for (const b of blocks) {
      const raw = '@font-face ' + b.trim();
      const fam = raw.match(/font-family:\s*'([^']+)'/)?.[1];
      const w = raw.match(/font-weight:\s*(\d+)/)?.[1];
      const s = raw.match(/font-style:\s*(normal|italic)/)?.[1] || 'normal';
      const urlM = raw.match(/url\(([^)]+)\)/);
      const fmt = raw.match(/format\(['"]?([^'")]+)['"]?\)/)?.[1] || 'woff2';
      if (!fam || !w || !urlM) { console.log('Skip block'); continue; }
      
      const fontUrl = urlM[1].replace(/['"]/g, '');
      const ext = fmt === 'truetype' ? 'ttf' : 'woff2';
      const slug = fam.toLowerCase().replace(/\s+/g, '-');
      const fn = `${slug}-${w}.${ext}`;
      const dest = path.join(FDIR, fn);
      
      console.log(`\n  ${fn}...`);
      const fr = await fetch(fontUrl);
      if (fr.status !== 200) { console.log('  FAIL HTTP', fr.status); continue; }
      fs.writeFileSync(dest, fr.data);
      console.log('  ' + fr.data.length + ' bytes');
      total += fr.data.length;
      
      cssOut.push(`@font-face { font-family: '${fam}'; font-style: ${s}; font-weight: ${w}; src: url('/static/fonts/${fn}') format('${fmt}'); font-display: swap; }`);
    }
    
    fs.writeFileSync(path.join(FDIR, 'fonts.css'), cssOut.join('\n\n'), 'utf-8');
    console.log('\nTotal fonts:', blocks.length, 'Total bytes:', total);
    
  } catch(e) { console.error('FAIL Fonts:', e.message, e.stack); }
  
  console.log('\n=== RESULT ===');
  const walk = (d) => { fs.readdirSync(d).forEach(f => { const fp = path.join(d,f); if (fs.statSync(fp).isDirectory()) walk(fp); else console.log('  ' + f + ': ' + fs.statSync(fp).size + ' bytes'); }); };
  walk(DIR);
}

main();
