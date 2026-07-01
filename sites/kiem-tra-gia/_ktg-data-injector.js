// _ktg-data-injector.js — Lưu data upload ra file, inject vào HTML khi serve (FIXED)
module.exports = function(env) {
  var ktgDir = env.dir;
  var fs = env.fs;
  var path = env.path;

  if (!fs.existsSync(ktgDir)) {
    try { fs.mkdirSync(ktgDir, { recursive: true }); } catch(e) {}
  }

  function getDataFile(lang) {
    return path.join(ktgDir, 'ktg-data-' + lang + '.json');
  }

  function loadData(lang) {
    var f = getDataFile(lang);
    try {
      if (fs.existsSync(f)) {
        return JSON.parse(fs.readFileSync(f, 'utf-8'));
      }
    } catch(e) {}
    return null;
  }

  /**
   * Tìm và thay thế var DATA_XXX = [...] hoặc {...}
   * Xử lý balanced brackets, string literals, template literals
   */
  function replaceDataVar(html, varName, jsCode) {
    var keyword = 'var ' + varName + ' = ';
    var start = html.indexOf(keyword);
    if (start < 0) return html;

    var pos = start + keyword.length;
    if (pos >= html.length) return html;

    var firstChar = html[pos];
    if (firstChar !== '[' && firstChar !== '{') {
      var end = html.indexOf(';', pos);
      if (end < 0) return html;
      return html.substring(0, start) + jsCode + html.substring(end + 1);
    }

    var closeChar = firstChar === '[' ? ']' : '}';
    var depth = 1;
    var inString = false;
    var inTemplate = false;
    var strChar = null;
    var i = pos + 1;

    while (i < html.length && depth > 0) {
      var c = html[i];
      var pc = i > 0 ? html[i-1] : '';

      if (inString) {
        if (c === '\\') { i += 2; continue; }
        if (c === strChar) inString = false;
        i++;
        continue;
      }
      if (inTemplate) {
        if (c === '\\') { i += 2; continue; }
        if (c === '`') inTemplate = false;
        if (c === '$' && i+1 < html.length && html[i+1] === '{') { i += 2; continue; }
        i++;
        continue;
      }

      if (c === '`') { inTemplate = true; i++; continue; }
      if (c === '"' || c === "'") { inString = true; strChar = c; i++; continue; }

      if (c === '[' || c === '{') depth++;
      if (c === ']' || c === '}') depth--;

      i++;
    }

    var semi = html.indexOf(';', i);
    var endReplace = (semi >= 0 && semi < i + 10) ? semi + 1 : i;

    return html.substring(0, start) + jsCode + html.substring(endReplace);
  }

  return {
    save: function(lang, blocks) {
      var f = getDataFile(lang);
      var existing = {};
      try {
        if (fs.existsSync(f)) {
          existing = JSON.parse(fs.readFileSync(f, 'utf-8'));
        }
      } catch(e) {}
      Object.keys(blocks).forEach(function(k) {
        existing[k] = blocks[k];
      });
      fs.writeFileSync(f, JSON.stringify(existing, null, 2), 'utf-8');
      console.log('[KTGInjector] Saved ' + Object.keys(blocks).length + ' blocks → ' + f);
      return true;
    },

    inject: function(html, lang) {
      var data = loadData(lang);
      if (!data) return html;

      var result = html;
      Object.keys(data).forEach(function(blockName) {
        var jsCode = data[blockName];
        if (!jsCode) return;

        var before = result;
        result = replaceDataVar(result, blockName, jsCode.trim());
        if (result !== before) {
          console.log('[KTGInjector] Injected ' + blockName + ' into ' + lang + '.html');
        }
      });

      return result;
    }
  };
};
