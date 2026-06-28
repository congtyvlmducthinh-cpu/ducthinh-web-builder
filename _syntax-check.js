const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');

// Extract JS between script tags
var jsStart = h.indexOf('<script>');
var jsEnd = h.lastIndexOf('</script>');
var js = h.substring(jsStart + 8, jsEnd);

// Use Node's vm to check for syntax errors with line numbers
var vm = require('vm');
try {
  vm.compileFunction(js);
  console.log('JS OK!');
} catch (e) {
  console.log('Error:', e.message);
  // Extract line number from error
  var m = e.stack.match(/:(\d+):/);
  if (m) {
    var lineNum = parseInt(m[1]);
    var lines = js.split('\n');
    for (var i = Math.max(0, lineNum - 5); i < Math.min(lines.length, lineNum + 3); i++) {
      console.log('  L' + (i+1) + ': ' + lines[i].substring(0, 120));
    }
  }
}
