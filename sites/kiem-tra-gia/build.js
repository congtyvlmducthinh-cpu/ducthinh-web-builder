/**
 * build.js — Build pipeline for Kiểm Tra Giá
 * node build.js [lang1] [lang2] ... (default: vi en zh)
 */
const fs = require('fs'), path = require('path');
const ROOT = __dirname, SRC = path.join(ROOT, 'src'), MODS = path.join(ROOT, 'modules');

var LANGS = {
  vi: { html: 'vi', label: 'VI' },
  en: { html: 'en', label: 'EN' },
  zh: { html: 'zh', label: 'ZH' }
};

function makeLangSwitcher(currentLang) {
  var links = Object.keys(LANGS).map(function(l) {
    var info = LANGS[l];
    var cls = l === currentLang ? ' active' : '';
    return '<a href="' + info.html + '.html" class="' + cls + '">' + info.label + '</a>';
  });
  return '<div class="lang-switcher">' + links.join('') + '</div>';
}

function build(lang) {
  console.log('\n\x1b[94m\xe2\x9e\xa1\xef\xb8\x8f ' + lang.toUpperCase() + '\x1b[0m');
  var tpl = fs.readFileSync(path.join(SRC, 'template.html'), 'utf-8');
  var data = fs.readFileSync(path.join(SRC, 'data.js'), 'utf-8');
  var modules = fs.readdirSync(MODS).filter(function(f) { return f.endsWith('.js'); }).sort()
    .map(function(f) { return '// ' + f + '\n' + fs.readFileSync(path.join(MODS, f), 'utf-8'); }).join('\n');
  var langJs = fs.readFileSync(path.join(SRC, lang + '.js'), 'utf-8');
  var fullJs = data + '\n' + modules + '\n' + langJs;

  var html = tpl.replace('{{JS_INLINE}}', function() { return fullJs; });
  html = html.replace('{{LANG_SWITCHER}}', function() { return makeLangSwitcher(lang); });
  html = html.replace('lang="vi"', 'lang="' + LANGS[lang].html + '"');
  fs.writeFileSync(path.join(ROOT, lang + '.html'), html, 'utf-8');
  var sizeKb = (fs.statSync(path.join(ROOT, lang + '.html')).size / 1024).toFixed(1);
  console.log('   \xe2\x86\x92 ' + lang + '.html (' + sizeKb + ' KB)');
}

var targets = process.argv.slice(2).filter(function(l) { return LANGS[l]; });
if (targets.length) targets.forEach(build);
else Object.keys(LANGS).forEach(build);
console.log('\n\x1b[92m\xe2\x9c\x85 Done\x1b[0m');
