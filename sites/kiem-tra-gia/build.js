const fs = require('fs');
const SRC = 'src';
const MODS = 'modules';
const TEMPLATE_FILE = 'src/template.html';
const DATA_FILE = 'src/data.js';
const OUT = ['vi.html', 'en.html', 'zh.html']

const PATCH = {
  vi: ['vi', 'patch', 'patch_bag_price', 'patch_main', 'patch_calc', 'patch_calc_size', 'patch_calc_size2', 'patch_calc_size3', 'patch_calc_size4', 'patch_css', 'patch_template', 'patch_quotation_bag'],
  en: ['en_patch', 'patch', 'patch_bag_price', 'patch_main', 'patch_calc', 'patch_calc_size', 'patch_calc_size2', 'patch_calc_size3', 'patch_calc_size4', 'patch_css', 'patch_template', 'patch_quotation_bag'],
  zh: ['zh', 'patch', 'patch_bag_price', 'patch_main', 'patch_calc', 'patch_calc_size', 'patch_calc_size2', 'patch_calc_size3', 'patch_calc_size4', 'patch_css', 'patch_template', 'patch_quotation_bag'],
};

var data = fs.readFileSync(DATA_FILE, 'utf-8');

// Find var DATA_PRODUCTS = [ ... ];
function extractDataVar(js, varName) {
  var keyword = 'var ' + varName + ' = ';
  var start = js.indexOf(keyword);
  if (start < 0) return '';
  var bodyStart = start + keyword.length;
  var firstChar = js[bodyStart];
  var closeChar = firstChar === '[' ? ']' : '}';
  var depth = 1;
  var i = bodyStart + 1;
  var inStr = false, strC = null, tmpl = false;
  while (i < js.length && depth > 0) {
    var c = js[i];
    if (inStr) {
      if (c === '\\') { i += 2; continue; }
      if (c === strC) inStr = false;
      i++; continue;
    }
    if (tmpl) {
      if (c === '`') tmpl = false;
      else if (c === '$' && i+1 < js.length && js[i+1] === '{') { i++; }
      i++; continue;
    }
    if (c === '`') { tmpl = true; i++; continue; }
    if (c === '"' || c === "'") { inStr = true; strC = c; i++; continue; }
    if (c === '[' || c === '{') depth++;
    if (c === ']' || c === '}') depth--;
    i++;
  }
  var endIdx = i;
  var semi = js.indexOf(';', bodyStart);
  if (semi >= 0 && semi <= endIdx) endIdx = semi + 1;
  return js.substring(start, endIdx).trim();
}

function dataBlock(name) {
  return extractDataVar(data, name);
}

function loadLang(lang) {
  var file = SRC + '/lang/' + lang + '.js';
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf-8') : '';
}

function loadModule(name) {
  var file = MODS + '/' + name;
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf-8') : '';
}

function loadSrc(name) {
  var file = SRC + '/' + name + '.js';
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf-8') : '';
}

function build(lang) {
  var html = fs.readFileSync(TEMPLATE_FILE, 'utf-8').trim();

  // Inject data blocks
  ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_APPLICATIONS'].forEach(function(name) {
    var block = data.startsWith('var ' + name) ? dataBlock(name) : '';
    if (block) html += '\n' + block;
  });

  // Inject modules
  html += '\n' + ['01-utils', '02-pricelist', '03-bags', '04-others', '05-calc', '06-manage', '07-main', '08-freight', '09-quotation', '10-market', '11-apps', '12-spec-data', '13-quotation-tab'].map(function(m) {
    var code = loadModule(m + '.js');
    return code || '';
  }).join('\n');

  // Inject lang patches
  html += '\n' + (PATCH[lang] || []).map(function(p) {
    return loadLang(p + '.js');
  }).join('\n');

  // Inject DATA_MAX_LOADING, DATA_COST_FOB
  html += '\n' + dataBlock('DATA_MAX_LOADING');
  html += '\n' + dataBlock('DATA_COST_FOB');

  html += '\n</script>\n</body>\n</html>';
  return html;
}

OUT.forEach(function(f) {
  var lang = f.split('.')[0];
  fs.writeFileSync(f, build(lang), 'utf-8');
  console.log('Built ' + f);
});

console.log('\nDone');
