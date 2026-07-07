const fs = require('fs');
const path = require('path');

const vnChars = /[àáạãảâầấậẫẩăằắặẵẳèéẹẽẻêềếệễểìíịĩỉòóọõỏôồốộỗổơờớợỡởùúụũủưừứựữửỳýỵỹỷđĐ]/;

function readFileSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch(e) { return null; }
}

function extractHTMLTexts(html) {
  let texts = [];
  let ms = html.match(/>([^<]{2,200})</g) || [];
  for (let m of ms) {
    let t = m.slice(1,-1).trim();
    if (t && t.length >= 2) texts.push(t);
  }
  return texts;
}

function extractAllJSStrings(js) {
  let strings = [];
  let tmpls = js.match(/`([^`]{2,200})`/g) || [];
  for (let s of tmpls) strings.push(s.slice(1,-1));
  let dqs = js.match(/"([^"\\]*(?:\\.[^"\\]*)*)"/g) || [];
  for (let s of dqs) strings.push(s.slice(1,-1));
  let sqs = js.match(/'([^'\\]*(?:\\.[^'\\]*)*)'/g) || [];
  for (let s of sqs) strings.push(s.slice(1,-1));
  return strings;
}

function isVnUItext(s) {
  if (!vnChars.test(s) || s.length < 4) return false;
  if (/^[A-Z0-9_./\s\-:;,(){}[\]'"+*\/\\=!<>?|&^%@#~`$]+$/.test(s)) return false;
  if (/^\d[\d\s.,\-]*$/.test(s)) return false;
  return true;
}

// Remove shared JSON data between all 3 files
function removeSharedData(str) {
  // Remove the DATA sections (the JSON product data embedded in JS)
  str = str.replace(/var DATA_APPLICATIONS\s*=\s*\[[\s\S]*?\];\s*var DATA_PRODUCTS\s*=\s*\[[\s\S]*?\];[\s\S]*?var DATA_OTHERS\s*=\s*\[[\s\S]*?\];/, '');
  return str;
}

const baseDir = __dirname;

const sites = [
  { dir: baseDir + '/kiem-tra-gia', files: ['vi.html', 'en.html', 'zh.html'] },
  { dir: baseDir + '/portal', files: ['index.html'] },
  { dir: baseDir + '/doccheck', files: ['index.html'] }
];

for (let site of sites) {
  console.log('\n' + '='.repeat(60));
  console.log(`📁 Site: ${site.dir.replace(baseDir,'')}`);
  console.log('='.repeat(60));
  
  let fileData = {};
  for (let f of site.files) {
    let fp = path.join(site.dir, f);
    fileData[f] = readFileSafe(fp);
    if (!fileData[f]) console.log(`  ❌ ${f}: CANNOT READ`);
    else console.log(`  ✅ ${f}: ${(fileData[f].length/1024).toFixed(1)} KB`);
  }
  
  let vi = fileData['vi.html'];
  let en = fileData['en.html'];
  let zh = fileData['zh.html'];
  
  if (vi && en) {
    // Clean: remove JSON product data from all 3 (shared, not UI)
    let viClean = removeSharedData(vi);
    let enClean = removeSharedData(en);
    let zhClean = zh ? removeSharedData(zh) : '';
    
    let viJS = (viClean.match(/<script>([\s\S]*?)<\/script>/i) || [,''])[1];
    let enJS = (enClean.match(/<script>([\s\S]*?)<\/script>/i) || [,''])[1];
    let zhJS = zhClean ? (zhClean.match(/<script>([\s\S]*?)<\/script>/i) || [,''])[1] : '';
    
    let enHTML = extractHTMLTexts(enClean);
    let viHTML = extractHTMLTexts(viClean);
    let zhHTML = zhClean ? extractHTMLTexts(zhClean) : [];
    
    // Get all VN UI strings from vi JS
    let viJSS = extractAllJSStrings(viJS);
    let viVN = [...new Set(viJSS.filter(s => isVnUItext(s)))];
    
    // Check en: which VN strings still appear?
    console.log(`\n🎯 en.html - Tổng số string tiếng Việt trong vi.html JS: ${viVN.length}`);
    
    let inEnOnly = viVN.filter(vs => en.includes(vs) && (!zh || !zh.includes(vs)));
    let inBoth = viVN.filter(vs => en.includes(vs) && zh && zh.includes(vs));
    
    // Focus on what's ONLY in en but not zh — these are clearly untranslated
    console.log(`\n--- Các string chỉ còn trong en.html (KHÔNG trong zh) - cần dịch gấp ---`);
    console.log(`  Count: ${inEnOnly.length}`);
    
    // Categorize by type
    let labels = inEnOnly.filter(s => !s.includes('<div') && !s.includes('<span') && !s.includes('<option') && !s.includes('<button'));
    let htmlBlocks = inEnOnly.filter(s => s.includes('<div') || s.includes('<span') || s.includes('<option') || s.includes('<button') || s.includes('<th') || s.includes('<tr'));
    
    console.log(`\n  [Strings thuần - ${labels.length} items]:`);
    for (let s of labels.sort()) console.log(`    "${s.substring(0, 120)}"`);
    
    console.log(`\n  [HTML blocks - ${htmlBlocks.length} items]:`);
    // Only show key ones
    let short = htmlBlocks.filter(s => s.length < 100);
    for (let s of short.sort()) console.log(`    "${s.substring(0, 120)}"`);
    
    // Now check en HTML visible text
    console.log(`\n--- HTML visible text còn VN trong en.html ---`);
    let enHtmlVn = [...new Set(enHTML.filter(t => isVnUItext(t)))].sort();
    console.log(`  Count: ${enHtmlVn.length}`);
    for (let t of enHtmlVn) console.log(`  >${t}<`);
    
    // NOW check zh: which VN strings still appear?
    if (zh) {
      let inZhOnly = viVN.filter(vs => zh.includes(vs) && !en.includes(vs));
      
      console.log(`\n🎯 zh.html - Các string chỉ còn trong zh (KHÔNG trong en) - cần dịch gấp ---`);
      console.log(`  Count: ${inZhOnly.length}`);
      
      let zhLabels = inZhOnly.filter(s => !s.includes('<div') && !s.includes('<span') && !s.includes('<option') && !s.includes('<button'));
      let zhHtmlBlock = inZhOnly.filter(s => s.includes('<div') || s.includes('<span') || s.includes('<option') || s.includes('<button') || s.includes('<th') || s.includes('<tr'));
      
      console.log(`\n  [Strings thuần - ${zhLabels.length} items]:`);
      for (let s of zhLabels.sort()) console.log(`    "${s.substring(0, 120)}"`);
      
      console.log(`\n  [HTML blocks - ${zhHtmlBlock.length} items]:`);
      for (let s of zhHtmlBlock.filter(s => s.length < 100).sort()) console.log(`    "${s.substring(0, 120)}"`);
      
      // zh HTML visible text
      console.log(`\n--- HTML visible text còn VN trong zh.html ---`);
      let zhHtmlVn = [...new Set(zhHTML.filter(t => isVnUItext(t)))].sort();
      console.log(`  Count: ${zhHtmlVn.length}`);
      for (let t of zhHtmlVn) console.log(`  >${t}<`);
    }
  }
  
  // Single-file sites
  if (!vi && site.files.length === 1) {
    let html = fileData[site.files[0]];
    if (html) {
      let texts = extractHTMLTexts(html);
      let vnTexts = [...new Set(texts.filter(t => vnChars.test(t) && t.length >= 3))].sort();
      console.log(`\n  ${site.files[0]}: ${vnTexts.length} Vietnamese UI texts`);
      for (let t of vnTexts) console.log(`  >${t}<`);
    }
  }
}
