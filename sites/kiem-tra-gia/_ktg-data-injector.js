// _ktg-data-injector.js — Lưu data upload ra file, inject vào HTML khi serve
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

  return {
    /**
     * Lưu data blocks cho 1 language
     * blocks = { DATA_PRODUCTS: "...", DATA_BAGS: "...", ... }
     * Mỗi giá trị là string JS: "var DATA_PRODUCTS = [{...},...];"
     */
    save: function(lang, blocks) {
      var f = getDataFile(lang);
      var existing = {};
      try {
        if (fs.existsSync(f)) {
          existing = JSON.parse(fs.readFileSync(f, 'utf-8'));
        }
      } catch(e) {}
      // Merge — overwrite từng block
      Object.keys(blocks).forEach(function(k) {
        existing[k] = blocks[k];
      });
      fs.writeFileSync(f, JSON.stringify(existing, null, 2), 'utf-8');
      console.log('[KTGInjector] Saved ' + Object.keys(blocks).length + ' blocks → ' + f);
      return true;
    },

    /**
     * Inject data đã lưu vào HTML.
     * Tìm các biến (var DATA_PRODUCTS = ...) và thay thế bằng dữ liệu đã lưu.
     */
    inject: function(html, lang) {
      var data = loadData(lang);
      if (!data) {
        return html; // không có dữ liệu đã upload → trả về nguyên bản
      }

      var result = html;
      Object.keys(data).forEach(function(blockName) {
        var jsCode = data[blockName];
        if (!jsCode) return;

        // Tìm var DATA_XXX = [...] hoặc var DATA_XXX = {...};
        // Regex: tìm "var DATA_PRODUCTS =" đến dấu ";" kết thúc
        var pattern = new RegExp(
          '(var\\s+' + blockName + '\\s*=\\s*)(\\[|\\{).*?(;\\s*)(\\n|\\r|$)', 's'
        );

        if (pattern.test(result)) {
          result = result.replace(pattern, jsCode.replace(/\n/g, ' '));
          console.log('[KTGInjector] Injected ' + blockName + ' into ' + lang + '.html');
        } else {
          // Fallback: tìm var DATA_PRODUCTS = và thay thế dòng đó
          var simplePattern = new RegExp(
            'var\\s+' + blockName + '\\s*=.*?;', 's'
          );
          if (simplePattern.test(result)) {
            result = result.replace(simplePattern, jsCode.trim());
            console.log('[KTGInjector] Injected ' + blockName + ' into ' + lang + ' (fallback)');
          }
        }
      });

      return result;
    }
  };
};
