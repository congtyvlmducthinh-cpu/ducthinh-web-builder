// _ktg-data-injector.js — Marker-based replacement (FAST, reliable)
module.exports = function(env) {
  var ktgDir = env.dir;
  var fs = env.fs;
  var path = env.path;
  if (!fs.existsSync(ktgDir)) { try { fs.mkdirSync(ktgDir, { recursive: true }); } catch(e) {} }
  function getDataFile(lang) { return path.join(ktgDir, 'ktg-data-' + lang + '.json'); }
  function loadData(lang) {
    var f = getDataFile(lang);
    try { if (fs.existsSync(f)) return JSON.parse(fs.readFileSync(f, 'utf-8')); } catch(e) {}
    return null;
  }
  function replaceMarkers(html, varName, fullDecl) {
    // Look for <!-- KTG-DATA:varName --> markers first
    var marker = '<!-- KTG-DATA:' + varName + ' -->';
    var markerEnd = '<!-- /KTG-DATA:' + varName + ' -->';
    var start = html.indexOf(marker);
    var end = html.indexOf(markerEnd);
    if (start >= 0 && end > start) {
      // Replace between markers
      var before = html.substring(0, start + marker.length + 1);
      var after = html.substring(end);
      return before + '\n' + fullDecl + '\n' + after;
    }
    // Fallback: find "var XXX = " and replace the entire declaration
    var keyword = 'var ' + varName + ' = ';
    var si = html.indexOf(keyword);
    if (si < 0) return html;
    var semi = html.indexOf(';', si);
    if (semi < 0) return html;
    return html.substring(0, si) + fullDecl + html.substring(semi + 1);
  }
  return {
    save: function(lang, blocks) {
      var f = getDataFile(lang);
      var existing = {};
      try { existing = JSON.parse(fs.readFileSync(f, 'utf-8')); } catch(e) {}
      Object.keys(blocks).forEach(function(k) { existing[k] = blocks[k]; });
      fs.writeFileSync(f, JSON.stringify(existing, null, 2), 'utf-8');
      console.log('[KTGInjector] Saved ' + f);
      return true;
    },
    inject: function(html, lang) {
      var data = loadData(lang);
      if (!data) return html;
      var result = html;
      Object.keys(data).forEach(function(k) {
        var v = data[k]; if (!v) return;
        var b = result;
        result = replaceMarkers(result, k, v.trim());
        if (result !== b) console.log('[KTGInjector] Injected ' + k);
      });
      return result;
    }
  };
};
