var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// Fix the require line (double quotes issue)
var old = "require(''C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/_ktg-data-injector.js')";
var newStr = "require('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/_ktg-data-injector.js')";
js = js.replace(old, newStr);
console.log('Fixed require path');

// Check if inject call was added
if (js.indexOf('ktgInjector.inject') < 0) {
  console.log('Inject call missing, adding...');
  var idx = js.indexOf('fs.readFile(filePath, \'utf-8\', function(err, data) {');
  if (idx >= 0) {
    var handlerEnd = js.indexOf('res.end(data);', idx);
    var before = js.substring(0, handlerEnd);
    var after = js.substring(handlerEnd);
    var inject = '\n        if (!err && data) {\n          var langMatch = req.url.match(/\/(vi|en|zh)\\.html$/);\n          var lang = langMatch ? langMatch[1] : \'vi\';\n          data = ktgInjector.inject(data, lang);\n        }\n';
    js = before + inject + after;
    console.log('Added inject call');
  } else {
    console.log('Could not find KTG readFile callback');
  }
} else {
  console.log('Inject call already present');
}

// Add logging to API endpoint
if (js.indexOf('ktgInjector.save') >= 0) {
  js = js.replace(
    'ktgInjector.save(lang, blocks);',
    'ktgInjector.save(lang, blocks);\n      console.log(\'[KTG] Upload data for \' + lang + \': \' + Object.keys(blocks).length + \' blocks\');'
  );
  console.log('Added logging to API endpoint');
}

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', js, 'utf-8');
console.log('Server.js patched');

// Syntax check
var execSync = require('child_process').execSync;
try {
  execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js" 2>&1', { encoding: 'utf-8', shell: true });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  console.log(e.stdout || e.stderr || e.message);
}
