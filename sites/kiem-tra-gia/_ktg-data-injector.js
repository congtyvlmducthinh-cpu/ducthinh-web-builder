// ΓöÇΓöÇΓöÇ KTG Data Store (runs in server.js context) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
// Inject this into server.js. Replaces data blocks in HTML with saved data.
// 
// USAGE: require('./_ktg-data-injector')({ __dirname, fs, path, server })

var KTG_DATA_DIR = null;
var ktgData = {};

function init(opts) {
  KTG_DATA_DIR = opts.dir || (opts.__dirname + '/ktg-data');
  var fs = opts.fs;
  var path = opts.path;
  
  ['vi', 'en', 'zh'].forEach(function(lang) {
    var fp = path.join(KTG_DATA_DIR, lang + '.json');
    try {
      if (fs.existsSync(fp)) {
        ktgData[lang] = JSON.parse(fs.readFileSync(fp, 'utf-8'));
        console.log('[KTG] Loaded saved data for ' + lang);
      } else {
        ktgData[lang] = {};
        console.log('[KTG] No saved data for ' + lang);
      }
    } catch(e) {
      ktgData[lang] = {};
    }
  });
}

// Replace data blocks in HTML with saved versions
function inject(html, lang) {
  var saved = ktgData[lang];
  if (!saved) return html;
  
  ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING', 'DATA_COST_FOB'].forEach(function(v) {
    var blk = saved[v];
    if (!blk) return;
    
    var idx = html.indexOf('var ' + v + ' = ');
    if (idx < 0) return;
    
    var before = html.substring(0, idx);
    var end;
    if (blk.match(/=\s*\{/)) {
      end = html.indexOf('};', idx) + 2;
    } else {
      end = html.indexOf('];', idx) + 2;
    }
    html = before + blk + html.substring(end);
  });
  
  return html;
}

function save(lang, dataBlocks) {
  if (!ktgData[lang]) ktgData[lang] = {};
  Object.keys(dataBlocks).forEach(function(k) { ktgData[lang][k] = dataBlocks[k]; });
  var fp = require('path').join(KTG_DATA_DIR, lang + '.json');
  require('fs').writeFileSync(fp, JSON.stringify(ktgData[lang], null, 2), 'utf-8');
  console.log('[KTG] Saved ' + Object.keys(dataBlocks).length + ' blocks for ' + lang);
}

module.exports = function(opts) {
  init(opts);
  return { inject: inject, save: save };
};
